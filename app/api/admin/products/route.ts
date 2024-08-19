import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';
import cloudinary from '@/src/utils/cloudinary';

export const dynamic = 'force-dynamic'; // Asegura que la ruta siempre se ejecute en el servidor

export async function GET(request: NextRequest) {
  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Database connected successfully');
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const id = searchParams.get('id');

    let query: any = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (id) query.id = id;

    console.log('MongoDB query:', query);

    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log('Products found:', products.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const productData: any = {};
    const additionalImages: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof Blob) {
        productData.image = await uploadToCloudinary(value);
      } else if (key.startsWith('images[') && value instanceof Blob) {
        const index = parseInt(key.match(/\d+/)?.[0] || '0', 10);
        additionalImages[index] = await uploadToCloudinary(value);
      } else {
        productData[key] = value;
      }
    }

    productData.images = additionalImages.filter(Boolean);

    if (!productData.subcategory) {
      return NextResponse.json({ error: 'Subcategory is required' }, { status: 400 });
    }

    const product = await Product.create(productData);
    return NextResponse.json({ message: 'Producto agregado exitosamente', product }, { status: 201 });
  } catch (error) {
    console.error('Error en POST request:', error);
    return NextResponse.json({ error: 'Error al añadir el producto' }, { status: 500 });
  }
}

async function uploadToCloudinary(file: Blob): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}
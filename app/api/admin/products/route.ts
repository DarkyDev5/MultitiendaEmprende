import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';
import { uploadToCloudinary, verifyImageExists } from '@/src/utils/cloudinaryUtils';
import { processFormData } from '@/src/utils/processFormData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const id = searchParams.get('id');
    let query: Record<string, any> = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (id) query.id = id;
    const products = await Product.find(query).sort({ createdAt: -1 });
    const verifiedProducts = await Promise.all(products.map(async (product) => {
      const verifiedProduct = product.toObject();
      if (verifiedProduct.image && typeof verifiedProduct.image === 'string') {
        verifiedProduct.image = await verifyImageExists(verifiedProduct.image)
          ? verifiedProduct.image
          : '/placeholder.jpg';
      }
      if (verifiedProduct.images && Array.isArray(verifiedProduct.images)) {
        verifiedProduct.images = await Promise.all(verifiedProduct.images.map(async (img: string) =>
          typeof img === 'string' && await verifyImageExists(img) ? img : '/placeholder.jpg'
        ));
      }
      return verifiedProduct;
    }));
    return NextResponse.json(verifiedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();
    let productData: any = {};

    // Procesar los campos del formulario
    for (const [key, value] of formData.entries()) {
      if (key !== 'image' && key !== 'images') {
        productData[key] = value;
      }
    }

    // Manejar la carga de la imagen principal
    if (formData.get('image')) {
      const imageFile = formData.get('image') as File;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageUrl = await uploadToCloudinary(buffer, `product_${productData.id}_main`);
      productData.image = imageUrl;
    }

    // Manejar la carga de imágenes adicionales
    if (formData.getAll('images')) {
      const imageFiles = formData.getAll('images') as File[];
      const imageUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return uploadToCloudinary(buffer, `product_${productData.id}_${index}`);
        })
      );
      productData.images = imageUrls;
    }

    // Crear o actualizar el producto en la base de datos
    const existingProduct = await Product.findOne({ id: productData.id });
    let product;
    if (existingProduct) {
      product = await Product.findOneAndUpdate({ id: productData.id }, productData, { new: true });
    } else {
      product = new Product(productData);
      await product.save();
    }

    return NextResponse.json({ message: 'Producto agregado/actualizado exitosamente', product }, { status: 200 });
  } catch (error) {
    console.error('Error en POST request:', error);
    return NextResponse.json({ error: 'Error al añadir/actualizar el producto' }, { status: 500 });
  }
}
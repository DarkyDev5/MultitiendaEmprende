import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/utils/cloudinary';

export async function GET() {
  try {
    console.log('Iniciando GET request');
    await dbConnect();
    const products = await Product.find({});
    console.log('Productos obtenidos:', products);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error en GET request:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando POST request');
    await dbConnect();
    const formData = await request.formData();
    console.log('FormData recibido:', formData);
    const productData: any = {};

    for (const [key, value] of formData.entries()) {
      console.log(`Procesando campo: ${key}`);
      if ((key === 'image' || key === 'images') && value instanceof Blob) {
        console.log('Procesando imagen');
        const buffer = Buffer.from(await value.arrayBuffer());
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "products" },
            (error, result) => {
              if (error) {
                console.error('Error al subir a Cloudinary:', error);
                reject(error);
              } else {
                console.log('Imagen subida a Cloudinary:', result);
                resolve(result);
              }
            }
          ).end(buffer);
        });
        const imageUrl = (uploadResult as any).secure_url;
        key === 'image' ? productData.image = imageUrl : (productData.images ??= []).push(imageUrl);
      } else {
        productData[key] = value;
      }
    }

    console.log('ProductData procesado:', productData);

    if (!productData.subcategory) {
      console.error('Error: Subcategory is required');
      throw new Error('Subcategory is required');
    }

    const product = await Product.create(productData);
    console.log('Producto creado:', product);
    return NextResponse.json({ message: 'Producto agregado exitosamente', product }, { status: 201 });
  } catch (error) {
    console.error('Error en POST request:', error);
    return NextResponse.json({ error: 'Error al añadir el producto' }, { status: 500 });
  }
}
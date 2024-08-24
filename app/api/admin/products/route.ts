import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/src/lib/mongodb';
import Product, { IProduct } from '@/src/models/Product';
import cloudinary from '@/src/utils/cloudinary';
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Database connected successfully');

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const id = searchParams.get('id');

    let query: Record<string, any> = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (id) query._id = new Types.ObjectId(id);

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
    const productData: Partial<IProduct> = {};
    const additionalImages: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof Blob) {
        productData.image = await uploadToCloudinary(value);
      } else if (key.startsWith('images[') && value instanceof Blob) {
        const index = parseInt(key.match(/\d+/)?.[0] || '0', 10);
        additionalImages[index] = await uploadToCloudinary(value);
      } else if (key === 'hasStock') {
        productData.hasStock = value === 'true';
      } else if (key === 'stock') {
        productData.stock = value ? parseInt(value as string) : null;
      } else if (key === 'price' || key === 'originalPrice' || key === 'rating') {
        productData[key] = parseFloat(value as string);
      } else if (key === 'fullDescription') {
        productData.fullDescription = (value as string).split('\n');
      } else {
        productData[key as keyof IProduct] = value as string;
      }
    }

    productData.images = additionalImages.filter(Boolean);

    if (!productData.subcategory) {
      return NextResponse.json({ error: 'Subcategory is required' }, { status: 400 });
    }

    const product = await Product.create(productData);
    const typedProduct = product as IProduct & { _id: Types.ObjectId };

    // Sync with Notion
    await notion.pages.create({
      parent: { database_id: notionDatabaseId! },
      properties: {
        ID: { rich_text: [{ text: { content: typedProduct._id.toString() } }] },
        Name: { title: [{ text: { content: typedProduct.name } }] },
        Brand: { rich_text: [{ text: { content: typedProduct.brand } }] },
        Price: { number: typedProduct.price },
        Rating: { number: typedProduct.rating },
        'Short Description': { rich_text: [{ text: { content: typedProduct.shortDescription } }] },
        'Original Price': { number: typedProduct.originalPrice },
        Color: { rich_text: [{ text: { content: typedProduct.color || '' } }] },
        Category: { select: { name: typedProduct.category } },
        Subcategory: { select: { name: typedProduct.subcategory } },
        'Full Description': { rich_text: [{ text: { content: typedProduct.fullDescription.join('\n') } }] },
        Seller: { rich_text: [{ text: { content: typedProduct.seller } }] },
        'Has Stock': { checkbox: typedProduct.hasStock },
        Stock: { number: typedProduct.stock || 0 },
      },
    });

    return NextResponse.json({ message: 'Producto agregado exitosamente', product: typedProduct }, { status: 201 });
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
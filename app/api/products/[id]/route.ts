import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const productId = params.id;
    console.log('Attempting to fetch product with ID:', productId);
    
    const product = await Product.findOne({ id: productId });
    
    if (!product) {
      console.log('Product not found:', productId);
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    
    console.log('Product found:', productId);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
  }
}
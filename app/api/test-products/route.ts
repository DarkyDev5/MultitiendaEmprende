import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/src/lib/products';

export async function GET(_request: NextRequest) {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products, count: products.length });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest) {
  try {
    await deleteAllProducts();
    return NextResponse.json({ message: 'Todos los productos han sido eliminados' });
  } catch (error) {
    console.error('Error al eliminar productos:', error);
    return NextResponse.json({ error: 'Error al eliminar productos' }, { status: 500 });
  }
}

async function deleteAllProducts() {
  const { default: dbConnect } = await import('@/src/lib/mongodb');
  const { default: Product } = await import('@/src/models/Product');
  
  await dbConnect();
  await Product.deleteMany({});
}
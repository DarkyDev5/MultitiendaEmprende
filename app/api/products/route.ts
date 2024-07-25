import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = {
    ...(searchParams.get('category') && { category: searchParams.get('category') }),
    ...(searchParams.get('subcategory') && { subcategory: searchParams.get('subcategory') })
  };

  try {
    await dbConnect();
    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  if (!id) {
    return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
  }

  try {
    await dbConnect();
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Producto eliminado con éxito' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
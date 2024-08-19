import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';

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

    let query: any = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (id) query._id = id;  // Nota: cambiado de 'id' a '_id'

    console.log('MongoDB query:', query);

    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log('Products found:', products.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Error al obtener productos', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
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
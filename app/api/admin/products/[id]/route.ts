import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('DELETE request received for product ID:', params.id);
    
    // Verificar si el método es DELETE
    if (request.method !== 'DELETE') {
      return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
    }

    await dbConnect();
    console.log('Database connected successfully');

    const productId = params.id;
    console.log('Attempting to find and delete product with ID:', productId);

    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      console.log('Product not found:', productId);
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    console.log('Product deleted successfully:', productId);
    return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
  }
}
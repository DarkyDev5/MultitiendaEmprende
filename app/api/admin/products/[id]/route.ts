import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const productId = params.id;
    console.log('Attempting to delete product with ID:', productId);

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
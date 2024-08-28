import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product, { IProduct } from '@/src/models/Product';
import { verifyImageExists, deleteFromCloudinary } from '@/src/utils/cloudinaryUtils';
import { processFormData } from '@/src/utils/processFormData';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await Product.findOne({ id: params.id });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const verifiedProduct = product.toObject();
    if (verifiedProduct.image) {
      verifiedProduct.image = await verifyImageExists(verifiedProduct.image)
        ? verifiedProduct.image
        : '/placeholder.jpg';
    }

    return NextResponse.json(verifiedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const productData = processFormData(formData);

    const product = new Product(productData);
    await product.save();
    return NextResponse.json({ message: 'Producto agregado exitosamente', product }, { status: 201 });
  } catch (error) {
    console.error('Error en POST request:', error);
    return NextResponse.json({ error: 'Error al añadir el producto' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const productData = processFormData(formData);

    const updatedProduct = await Product.findOneAndUpdate(
      { id: params.id },
      productData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedProduct = await Product.findOneAndDelete({ id: params.id });

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Delete the main image from Cloudinary
    if (deletedProduct.image) {
      await deleteFromCloudinary(deletedProduct.image);
    }

    // Delete additional images from Cloudinary
    if (deletedProduct.images && Array.isArray(deletedProduct.images)) {
      await Promise.all(deletedProduct.images.map(deleteFromCloudinary));
    }

    return NextResponse.json({ message: 'Producto y sus imágenes eliminados exitosamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
  }
}
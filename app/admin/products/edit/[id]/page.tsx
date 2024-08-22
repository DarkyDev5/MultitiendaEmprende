"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductFormData } from '@/src/types/product';
import { productSchema } from '@/src/schemas/productSchema';
import FormFields from '@/src/componentsAdmin/AdminProductForm/FormFields';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      image: '',
      images: [],
    }
  });

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          reset(data);
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [params.id, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (response.ok) {
        router.push('/admin/products');
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormFields control={control} errors={errors} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
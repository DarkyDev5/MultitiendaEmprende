import { useState, useCallback } from "react";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTransition } from 'react';
import { ProductFormData, ProductFormDefaultValues } from "../types/product";
import { productSchema } from "../schemas/productSchema";

export default function useProductForm(): {
  formMethods: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isPending: boolean;
  previewImages: string[];
  handleImageChange: (fieldName: 'image' | 'images', files: File[]) => void;
} {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
 
  const formMethods = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues: {
      id: "",
      name: "",
      brand: "",
      price: 0,
      rating: 1,
      shortDescription: "",
      originalPrice: null,
      color: null,
      category: "",
      subcategory: "",
      image: "",
      images: [],
      fullDescription: "",
      seller: "",
      hasStock: false,
      stock: null,
    } as ProductFormDefaultValues,
  });
 
  const onSubmit = useCallback((data: ProductFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            formData.append("image", value);
          } else if (typeof value === 'string') {
            formData.append("image", value);
          }
        } else if (key === "images") {
          if (Array.isArray(value)) {
            value.forEach((img, index) => {
              if (img instanceof File) {
                formData.append(`images`, img);
              } else if (typeof img === 'string') {
                formData.append(`images`, img);
              }
            });
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      try {
        const response = await fetch("/api/admin/products", {
          method: "POST",
          body: formData
        });
       
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Error al agregar el producto");
        }
       
        router.push(`/Productos/${data.category}/${data.subcategory}`);
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        // formMethods.setError('root', { type: 'submit', message: error.message });
      }
    });
  }, [router]);

  const handleImageChange = useCallback((fieldName: 'image' | 'images', files: File[]) => {
    const sortedFiles = files.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {numeric: true})
    );
    const newPreviewImages = sortedFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prevImages => {
      prevImages.forEach(URL.revokeObjectURL);
      return newPreviewImages;
    });

    // Actualizar el valor del formulario
    if (fieldName === 'image') {
      formMethods.setValue('image', sortedFiles[0]);
    } else {
      formMethods.setValue('images', sortedFiles);
    }
  }, [formMethods]);

  return { formMethods, onSubmit, isPending, previewImages, handleImageChange };
}
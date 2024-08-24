import { useState, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTransition } from 'react';
import { ProductFormData } from "../types/product";
import { productSchema } from "../schemas/productSchema";

export default function useProductForm(): {
  formMethods: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isPending: boolean;
  previewImages: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
 
  const formMethods = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      category: "",
      subcategory: "",
      image: null,
      images: null,
      fullDescription: [""],
      hasStock: false,
      stock: null,
    },
  });

  const onSubmit = useCallback((data: ProductFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof FileList && value[0]) {
          formData.append("image", value[0]);
        } else if (key === "images" && value instanceof FileList) {
          Array.from(value)
            .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}))
            .forEach((file, index) => formData.append(`images[${index}]`, file));
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

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const sortedFiles = Array.from(files).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {numeric: true})
      );
      const newPreviewImages = sortedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(prevImages => {
        // Limpia las URLs de objetos anteriores para evitar fugas de memoria
        prevImages.forEach(URL.revokeObjectURL);
        return newPreviewImages;
      });
    }
  }, []);

  return { formMethods, onSubmit, isPending, previewImages, handleImageChange };
}
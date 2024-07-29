import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTransition } from 'react';
import { ProductFormData } from "../types/product";
import { productSchema } from "../schemas/productSchema";

export default function useProductForm() {
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
      fullDescription: "",
    },
  });

  const onSubmit = (data: ProductFormData) => startTransition(async () => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList && value[0]) {
        formData.append("image", value[0]);
      } else if (key === "images" && value instanceof FileList) {
        Array.from(value)
          .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}))
          .forEach((file, index) => formData.append(`images[${index}]`, file));
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await fetch("/api/admin/products", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Error al agregar el producto");
      router.push(`/Productos/${data.category}/${data.subcategory}`);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const sortedFiles = Array.from(files).sort((a, b) => 
        a.name.localeCompare(b.name, undefined, {numeric: true})
      );
      setPreviewImages(sortedFiles.map(file => URL.createObjectURL(file)));
    }
  };

  return { formMethods, onSubmit, isPending, previewImages, handleImageChange };
}
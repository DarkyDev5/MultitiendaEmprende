"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ProductFormData, categories } from "@/types/product";
import { productSchema } from "@/schemas/productSchema";
import { useFormStatus } from 'react-dom';

export default function AdminProductForm() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      category: "",
      subcategory: "",
      image: null,
      images: null,
      fullDescription: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList && value[0]) {
        formData.append("image", value[0]);
      } else if (key === "images" && Array.isArray(value)) {
        value.forEach((file, index) => {
          if (file instanceof File) {
            formData.append(`images[${index}]`, file);
          }
        });
      } else {
        formData.append(key, value as string);
      }
    });
  
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Error al agregar el producto");
      router.push(`/Productos/${data.category}/${data.subcategory}`);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const renderField = (field: string) => (
    <div key={field}>
      <label className="block mb-2 capitalize">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
      <input
        {...register(field as keyof ProductFormData)}
        type={["price", "rating", "originalPrice"].includes(field) ? "number" : "text"}
        step={["price", "originalPrice"].includes(field) ? "0.01" : field === "rating" ? "1" : undefined}
        min={field === "rating" ? "1" : undefined}
        max={field === "rating" ? "5" : undefined}
        className="w-full p-2 border rounded"
      />
      {errors[field as keyof ProductFormData] && <p className="text-red-500">{errors[field as keyof ProductFormData]?.message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h1>

      {["id", "name", "price", "rating", "shortDescription", "originalPrice", "color"].map(renderField)}

      <div>
        <label className="block mb-2">Categoría:</label>
        <select {...register("category")} className="w-full p-2 border rounded">
          <option value="">Seleccione una categoría</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      {watch("category") && (
        <div>
          <label className="block mb-2">Subcategoría:</label>
          <select {...register("subcategory")} className="w-full p-2 border rounded">
            <option value="">Seleccione una subcategoría</option>
            {categories[watch("category")].map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
          {errors.subcategory && <p className="text-red-500">{errors.subcategory.message}</p>}
        </div>
      )}

      <div>
        <label className="block mb-2">Imagen Principal:</label>
        <input type="file" {...register("image")} accept="image/*" />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block mb-2">Imágenes Adicionales (máximo 6):</label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length <= 6) {
                  field.onChange(Array.from(files));
                } else {
                  e.target.value = "";
                  alert("Máximo 6 imágenes permitidas.");
                }
              }}
              accept="image/*"
              multiple
            />
          )}
        />
        {errors.images && <p className="text-red-500">{errors.images.message}</p>}
      </div>

      <div>
        <label className="block mb-2">Descripción Completa:</label>
        <textarea {...register("fullDescription")} className="w-full p-2 border rounded" rows={4} />
        {errors.fullDescription && <p className="text-red-500">{errors.fullDescription.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Agregando..." : "Agregar Producto"}
      </button>
    </form>
  );
}
'use client';

import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";
import FileUpload from "./ImageComponents/FileUpload";

interface ImageFieldsProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ImageFields({ control, errors }: ImageFieldsProps) {
  const convertToFileArray = (value: any): File[] | null => {
    if (value instanceof File) return [value];
    if (Array.isArray(value) && value.every(item => item instanceof File)) return value as File[];
    if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
      // Si son URLs, podrías manejarlas de alguna manera aquí
      console.warn('URLs de imágenes detectadas. Considera cómo manejarlas.');
      return null;
    }
    return null;
  };

  return (
    <>
      {["image", "images"].map((field) => (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field === "image" ? "Imagen Principal" : "Imágenes Adicionales (máximo 6)"}
          </label>
          <Controller
            name={field as "image" | "images"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileUpload
                onChange={(files) => {
                  if (field === "image") {
                    onChange(files[0] || null);
                  } else {
                    onChange(files);
                  }
                }}
                value={convertToFileArray(value)}
                multiple={field === "images"}
                maxFiles={field === "images" ? 6 : 1}
              />
            )}
          />
          {errors[field as "image" | "images"] && (
            <p className="mt-2 text-sm text-red-600">
              {errors[field as "image" | "images"]?.message}
            </p>
          )}
        </div>
      ))}
    </>
  );
}
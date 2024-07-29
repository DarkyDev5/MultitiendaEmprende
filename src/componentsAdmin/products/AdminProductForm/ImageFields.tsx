import React from "react";
import { motion } from "framer-motion";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface ImageFieldsProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ImageFields({ control, errors }: ImageFieldsProps) {
  return (
    <>
      {["image", "images"].map((field) => (
        <motion.div key={field} className="space-y-2" whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700">
            {field === "image" ? "Imagen Principal" : "Imágenes Adicionales (máximo 6)"}
          </label>
          <Controller
            name={field as "image" | "images"}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files) {
                    if (field === "image") {
                      onChange(files[0]);
                    } else if (field === "images" && files.length <= 6) {
                      onChange(files);
                    } else {
                      alert("Máximo 6 imágenes permitidas.");
                      return;
                    }
                  }
                }}
                accept="image/*"
                multiple={field === "images"}
                {...rest}
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            )}
          />
          {errors[field as "image" | "images"] && <p className="mt-2 text-sm text-red-600">{errors[field as "image" | "images"]?.message}</p>}
        </motion.div>
      ))}
    </>
  );
}
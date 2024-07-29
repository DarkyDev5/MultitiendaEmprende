"use client";

import React from "react";
import { motion } from "framer-motion";
import FormFields from "./FormFields";
import CategoryFields from "./CategoryFields";
import ImageFields from "./ImageFields";
import PreviewImages from "./PreviewImages";
import useProductForm from "@/src/Hook/useProductForm";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

export default function AdminProductForm() {
  const { formMethods, onSubmit, isPending, previewImages } = useProductForm();
  const { register, handleSubmit, control, watch, formState: { errors } } = formMethods as UseFormReturn<ProductFormData>;

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Agregar Nuevo Producto</h1>
      <FormFields register={register} errors={errors} />
      <CategoryFields register={register} watch={watch} errors={errors} />
      <ImageFields control={control} errors={errors} />
      <PreviewImages images={previewImages} />
      <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
        <label className="block text-sm font-medium text-gray-700">Descripción Completa:</label>
        <textarea 
          {...register("fullDescription")} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
          rows={4} 
        />
        {errors.fullDescription && <p className="mt-2 text-sm text-red-600">{errors.fullDescription.message}</p>}
      </motion.div>
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPending ? "Agregando..." : "Agregar Producto"}
      </motion.button>
    </motion.form>
  );
}
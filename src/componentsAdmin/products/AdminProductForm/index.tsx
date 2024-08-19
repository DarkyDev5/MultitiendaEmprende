"use client";

import React from "react";
import { motion } from "framer-motion";
import FormFields from "./FormFields";
import CategoryFields from "./CategoryFields";
import ImageFields from "./ImageFields";
import PreviewImages from "./PreviewImages";
import useProductForm from "@/src/hooks/useProductForm";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

export default function AdminProductForm() {
  const { formMethods, onSubmit, isPending, previewImages } = useProductForm();
  const { register, handleSubmit, control, watch, formState: { errors } } = formMethods as UseFormReturn<ProductFormData>;

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-8 max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-xl"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        variants={childVariants}
      >
        Agregar Nuevo Producto
      </motion.h1>

      <motion.div variants={childVariants}>
        <FormFields control={control} errors={errors} />
      </motion.div>

      <motion.div variants={childVariants}>
        <CategoryFields control={control} watch={watch} errors={errors} />
      </motion.div>

      <motion.div variants={childVariants}>
        <ImageFields control={control} errors={errors} />
      </motion.div>

      {previewImages.length > 0 && (
        <motion.div variants={childVariants}>
          <PreviewImages images={previewImages} />
        </motion.div>
      )}

      <motion.div variants={childVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Descripción Completa:</label>
        <textarea 
          {...register("fullDescription")} 
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200" 
          rows={6} 
        />
        {errors.fullDescription && (
          <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.fullDescription.message}</p>
        )}
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        variants={childVariants}
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Agregando...
          </span>
        ) : (
          "Agregar Producto"
        )}
      </motion.button>
    </motion.form>
  );
}
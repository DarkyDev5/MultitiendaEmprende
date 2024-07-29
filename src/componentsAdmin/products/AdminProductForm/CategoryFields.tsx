import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/src/types/product";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface CategoryFieldsProps {
  register: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function CategoryFields({ register, watch, errors }: CategoryFieldsProps) {
  return (
    <>
      {["category", "subcategory"].map((field) => (
        <motion.div key={field} className="space-y-2" whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700">{field}:</label>
          <select 
            {...register(field as "category" | "subcategory")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione {field === "category" ? "una categoría" : "una subcategoría"}</option>
            {field === "category" 
              ? Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)
              : categories[watch("category")]?.map(sub => <option key={sub} value={sub}>{sub}</option>)
            }
          </select>
          {errors[field as "category" | "subcategory"] && <p className="mt-2 text-sm text-red-600">{errors[field as "category" | "subcategory"]?.message}</p>}
        </motion.div>
      ))}
    </>
  );
}
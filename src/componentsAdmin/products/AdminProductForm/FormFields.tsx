import React from "react";
import { motion } from "framer-motion";
import { fieldConfig } from "@/src/utils/formConfig";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface FormFieldsProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function FormFields({ register, errors }: FormFieldsProps) {
  return (
    <>
      {fieldConfig.map(({ name, type, ...rest }) => (
        <motion.div key={name} className="space-y-2" whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700">{name.replace(/([A-Z])/g, " $1").trim()}:</label>
          <input
            {...register(name as keyof ProductFormData)}
            type={type}
            {...rest}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors[name as keyof ProductFormData] && <p className="mt-2 text-sm text-red-600">{errors[name as keyof ProductFormData]?.message}</p>}
        </motion.div>
      ))}
    </>
  );
}
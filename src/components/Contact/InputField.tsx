// InputField.tsx
import React from 'react';
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder, register, error }) => (
  <div>
    <label className="block text-white text-sm font-semibold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      {...register}
      className="w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring focus:ring-[#4f46e5] focus:ring-opacity-50"
      id={id}
      type={type}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default InputField;

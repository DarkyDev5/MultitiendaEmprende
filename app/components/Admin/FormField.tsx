import React from 'react';
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
  as?: 'input' | 'textarea';
}

function FormField<T extends FieldValues>({ 
  label, 
  name, 
  register, 
  errors, 
  type = 'text', 
  step, 
  min, 
  max, 
  as = 'input' 
}: FormFieldProps<T>) {
  const Component = as;
  return (
    <div>
      <label className="block mb-2">{label}:</label>
      <Component
        {...register(name)}
        type={type}
        step={step}
        min={min}
        max={max}
        className="w-full p-2 border rounded"
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
    </div>
  );
}

export default FormField;
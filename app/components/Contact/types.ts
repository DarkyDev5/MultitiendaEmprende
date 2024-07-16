// types.ts
import { Merge, FieldError, FieldErrorsImpl } from "react-hook-form";

export type CountryOption = {
    label: string;
    value: string;
    code: string;
  };
  
  export interface FormData {
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    observations?: string;
  }

export type Status = {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
};

export type FormErrors = {
  name?: Merge<FieldError, FieldErrorsImpl<any>>;
  phone?: Merge<FieldError, FieldErrorsImpl<any>>;
  email?: Merge<FieldError, FieldErrorsImpl<any>>;
  countryCode?: Merge<FieldError, FieldErrorsImpl<any>>;
};

// CountrySelect.tsx
import React from 'react';
import Select from 'react-select';
import ReactCountryFlag from "react-country-flag";
import { FieldError } from "react-hook-form";

type CountryOption = {
  label: string;
  value: string;
  code: string;
};

type CountrySelectProps = {
  options: CountryOption[];
  value: string | null;
  onChange: (option: CountryOption | null) => void;
  error?: FieldError;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ options, value, onChange, error }) => (
  <div>
    <label className="block text-white text-sm font-semibold mb-2" htmlFor="countryCode">
      Código de país
    </label>
    <Select 
      options={options}
      placeholder="Seleccione el código de país"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      formatOptionLabel={(option: CountryOption) => (
        <div className="flex items-center">
          <ReactCountryFlag countryCode={option.code} svg className="mr-2"/>
          <span>{option.label}</span>
        </div>
      )}
      value={options.find(option => option.value === value) || null}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default CountrySelect;
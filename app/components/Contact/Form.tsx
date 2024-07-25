// Form.tsx
'use client';
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCart } from "../Cart/CartContext";
import axios, { AxiosError } from 'axios';
import InputField from './InputField';
import CountrySelect from './CountrySelect';
import ThankYouMessage from './ThankYouMessage';
import { FormData, Status, CountryOption } from './types';
import { countries } from 'countries-list';

const Form: React.FC = () => {
  const { cart, emptyCart } = useCart();
  const { control, handleSubmit, formState: { errors }, register } = useForm<FormData>();
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' });
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const countryOptions: CountryOption[] = Object.entries(countries).map(([code, country]) => ({
    label: `${country.name} +${country.phone[0]}`,
    value: code,
    code: code,
  }));

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setStatus({ type: 'loading', message: 'Enviando mensaje...' });
      const cartString = cart.map((item: { product: { name: any; }; quantity: any; }) => `${item.product.name}: ${item.quantity}`).join(', ');
      
      // Enviar los datos a tu API
      const response = await axios.post('/api/Contact', {
        name: data.name,
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        observations: data.observations || 'N/A',
        cart: cartString
      });
  
      if (response.status === 200) {
        setStatus({ type: 'success', message: '¡Mensaje enviado con éxito!' });
        emptyCart();
        setShowThankYouMessage(true);
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setStatus({
        type: 'error',
        message: (axiosError.response?.data as { error: string })?.error || 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
      });
    }
  };
  if (showThankYouMessage) {
    return <ThankYouMessage />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative z-10 max-w-md w-full space-y-8 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center">Completar la compra</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            id="name"
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            register={register("name", { required: 'Este campo es requerido' })}
            error={errors.name}
          />
          <InputField
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            register={register("email", {
              required: 'Este campo es requerido',
              pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' }
            })}
            error={errors.email}
          />
          <Controller
            name="countryCode"
            control={control}
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <CountrySelect
                options={countryOptions}
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
                error={errors.countryCode}
              />
            )}
          />
          <InputField
            id="phone"
            label="Celular"
            type="tel"
            placeholder="Tu número de celular"
            register={register("phone", { required: 'Este campo es requerido' })}
            error={errors.phone}
          />
          <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="observations">
              Observaciones
            </label>
            <textarea
              {...register("observations")}
              className="w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring focus:ring-[#4f46e5] focus:ring-opacity-50 h-32 resize-none"
              id="observations"
              placeholder="Ingrese sus observaciones"
            />
          </div>
          <div>
            <button
              className="w-full bg-[#3a4e7a] hover:bg-[#3a4e7a] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
              type="submit"
              disabled={status.type === 'loading'}
            >
              {status.type === 'loading' ? 'Enviando...' : 'Enviar'}
            </button>
            {status.type === 'error' && <p className="text-red-500 text-xs mt-2">{status.message}</p>}
            {status.type === 'success' && <p className="text-green-500 text-xs mt-2">{status.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
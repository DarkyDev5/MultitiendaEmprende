import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../Productos/CartContext";
import Image from 'next/image';
import { useForm as useFormspree, ValidationError } from '@formspree/react';
import Select from 'react-select';
import ReactCountryFlag from "react-country-flag";

type FormData = {
  name: string;
  phone: number;
  email: string;
  observations: string;
  countryCode: { label: string, value: string, code: string }; // Añade esto
  // Otros campos si son necesarios
};

const countryOptions = [  // Añade esto
  { label: "Estados Unidos +1", value: "+1", code: "US" },
  { label: "Colombia +57", value: "+57", code: "CO" },
  { label: "Argentina +54", value: "+54", code: "AR" },
  // Agrega más opciones para otros países
];

const Form: React.FC = () => {
  const { cart, removeFromCart, emptyCart } = useCart();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const [state, formspreeSubmit] = useFormspree("xzbnerwp");

  // Nuevo estado para controlar si se muestra el mensaje de agradecimiento
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const [countryCode, setCountryCode] = useState<{ label: string; value: string; code: string; } | null>(null);

  useEffect(() => {
    register("countryCode"); // Añade esto
  }, [register]);

  const onSubmit = (data: FormData) => {
    const cartString = cart.map(item => `${item.product.name}: ${item.quantity}`).join(', ');
    formspreeSubmit({ ...data, cart: cartString, countryCode: countryCode?.value });
  };
  



  // Efecto secundario que se ejecuta cuando el estado de Formspree cambia
  useEffect(() => {
    if (state.succeeded) {
      emptyCart();
      setShowThankYouMessage(true); // Muestra el mensaje de agradecimiento cuando el formulario se envía exitosamente
    }
  }, [state.succeeded, emptyCart]);

  if (showThankYouMessage) {
    return (
      <div className="text-center">
        <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md my-5" role="alert">
          <div className="flex justify-center">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.34 8.66a.5.5 0 0 1 .7-.7l1.6 1.6 3.1-3.1a.5.5 0 0 1 .7.7l-3.5 3.5a.5.5 0 0 1-.7 0l-1.9-1.9z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">Gracias por tu compra!</p>
              <p className="text-sm">Nos pondremos en contacto contigo en breve.</p>
            </div>
          </div>
        </div>
        <div className="my-8">
          <Image src="/Fondonav.jpg" alt="Descripción de la imagen" width={500} height={300} />
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Completar la compra</h2>
      <div className="space-y-6 mb-8">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow">
            <div className="flex-shrink-0">
              <Image src={item.product.image} alt={item.product.name} width={100} height={100} />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p>Cantidad: {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item.product.id)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-150">
              Eliminar
            </button>
          </div>
        ))}
      </div>
  
      <div className="mt-8">
        <label className="block">
          <span className="text-gray-700">Nombre</span>
          <input {...register("name", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Ingrese su nombre" />
          {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </label>
  
        <label className="block mt-4">
          <span className="text-gray-700">Correo Electrónico</span>
          <input type="email" {...register("email", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Ingrese su correo electrónico" />
          {errors.email && <span className="text-red-500">Este campo es obligatorio</span>}
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </label>

        <label className="block mt-4">
      <span className="text-gray-700">Código de país</span>
      <Select 
        options={countryOptions}
        placeholder="Seleccione el código de país"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        formatOptionLabel={(option) => (
          <div className="flex items-center">
            <ReactCountryFlag countryCode={option.code} svg className="mr-2"/>
            <span>{option.label}</span>
          </div>
        )}
        onChange={value => setCountryCode(value)}  // Manejar el cambio de valor manualmente
      />
      {errors.countryCode && <span className="text-red-500">Este campo es obligatorio</span>}
      <ValidationError prefix="Country Code" field="countryCode" errors={state.errors} />
    </label>
        <label className="block mt-4">
          <span className="text-gray-700">Celular</span>
          <input type="tel" {...register("phone", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Ingrese su número de celular" />
          {errors.phone && <span className="text-red-500">Este campo es obligatorio</span>}
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />
        </label>
  
        <label className="block mt-4">
          <span className="text-gray-700">Observaciones</span>
          <textarea {...register("observations")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Ingrese sus observaciones" />
          <ValidationError prefix="Observations" field="observations" errors={state.errors} />
        </label>
  
        <button type="submit" className="w-full py-3 mt-6 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">Enviar</button>
      </div>
    </form>
  </div>
  )
};

export default Form;

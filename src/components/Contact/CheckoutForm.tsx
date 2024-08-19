'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { sendOrder } from '@/lib/api';
import { Input } from './InputField';
import { CountrySelect } from './CountrySelect';
import { ThankYouMessage } from './ThankYouMessage';
import { FormData } from './types';

export default function CheckoutForm() {
  const { cart, clearCart, getCartTotal } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('idle');
      const cartItems = cart.map(item => `${item.product.name}: ${item.quantity}`).join(', ');
      await sendOrder({ ...data, cart: cartItems, total: getCartTotal() });
      setStatus('success');
      clearCart();
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <ThankYouMessage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Finalizar Compra</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre"
          {...register('name', { required: 'Nombre es requerido' })}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email es requerido',
            pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
          })}
          error={errors.email?.message}
        />
        <CountrySelect
          {...register('countryCode', { required: 'País es requerido' })}
          error={errors.countryCode?.message}
        />
        <Input
          label="Teléfono"
          type="tel"
          {...register('phone', { required: 'Teléfono es requerido' })}
          error={errors.phone?.message}
        />
        <textarea
          {...register('observations')}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="Observaciones (opcional)"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Finalizar Compra
        </motion.button>
      </form>
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-red-100 text-red-700 rounded"
          >
            Ha ocurrido un error. Por favor, intenta de nuevo.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

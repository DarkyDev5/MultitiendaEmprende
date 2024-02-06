// CheckoutPage.tsx
"use client"
import React from 'react';
import Form from './form';
import Navbar from '../MainPage/Navbar';
import Footer from '../MainPage/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider, useCart } from '../Productos/CartContext';
import Cards from '../Productos/Cards';

const App: React.FC = () => {
  

  return (
    <CartProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Navbar />
          <section>
          <Form  />
          </section>
          <Footer />
          
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}
export default App;

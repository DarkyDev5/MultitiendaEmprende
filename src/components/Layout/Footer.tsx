// app/components/Footer.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const DynamicMapComponent = dynamic(() => import('../Map/MapComponent'), { ssr: false });

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/multitiendaemprende/", color: "hover:text-blue-600" },
  { icon: FaInstagram, href: "https://www.instagram.com/multitiendaemprende/", color: "hover:text-pink-600" },
  { icon: FaTwitter, href: "https://www.twitter.com/multitiendaemprende/", color: "hover:text-blue-400" },
];

const contactInfo = [
  { icon: FaMapMarkerAlt, text: "Centro Comercial SanSebastian, Cl. 7 #N° 1 - 78, Madrid, Cundinamarca" },
  { icon: FaPhone, text: "+57 310905400" },
  { icon: FaEnvelope, text: "contacto@multitienda.com" },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-white text-gray-700 py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-2xl font-bold mb-6 text-indigo-700">Contacto</h5>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center">
                  <item.icon className="mr-3 text-indigo-500" />
                  <span className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="text-2xl font-bold mb-6 text-indigo-700">Nuestra Ubicación</h5>
            <div className="h-48 rounded-lg overflow-hidden shadow-md">
              <DynamicMapComponent />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="text-2xl font-bold mb-6 text-indigo-700">Enlaces Rápidos</h5>
            <ul className="space-y-2">
              {['Política de Privacidad', 'Términos de Servicio', 'FAQ'].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h5 className="text-2xl font-bold mb-6 text-indigo-700">Suscríbete</h5>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md">
                Suscribir
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={`${social.color} transition-colors duration-300`}>
                <social.icon size={24} />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Regiossoft. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>

      {/* Fondo decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-100 to-transparent opacity-50" />
    </footer>
  );
}
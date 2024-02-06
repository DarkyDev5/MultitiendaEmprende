"use client"
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import MapComponent from "./Mapa/MapComponent";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 relative">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Información de Contacto */}
          <div>
            <h5 className="text-xl font-bold mb-6">Contacto</h5>
            <ul>
              <li className="flex items-center mb-4 hover:text-gray-300 transition-colors duration-300">
                <FaMapMarkerAlt className="mr-4" /> Centro Comercial SanSebastian, Cl. 7 #N° 1 - 78, Madrid, Cundinamarca
              </li>
              <li className="flex items-center mb-4 hover:text-gray-300 transition-colors duration-300">
                <FaPhone className="mr-4" /> +57 123 456 7890
              </li>
              <li className="flex items-center hover:text-gray-300 transition-colors duration-300">
                <FaEnvelope className="mr-4" /> contacto@multitienda.com
              </li>
            </ul>
          </div>

          {/* Mapa y Hora Local */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-xl font-bold mb-6">Visítanos En Nuestra Tienda</h5>
                <MapComponent />
              </div>
              <div>
                <h5 className="text-xl font-bold mb-6">Hora Local</h5>
                <div className="flex items-center text-lg">
                  <FaClock className="mr-4" />
                  <p>Madrid, Cundinamarca - 10:45 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociales, Enlaces Rápidos y Suscripción */}
        <div className="mt-10 border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">Síguenos</h5>
              <div className="flex">
                <a href="https://www.facebook.com/multitiendaemprende/" target="_blank" rel="noopener noreferrer" className="mr-6 hover:text-blue-600">
                  <FaFacebookF size={24} />
                </a>
                <a href="https://www.instagram.com/multitiendaemprende/" target="_blank" rel="noopener noreferrer" className="mr-6 hover:text-pink-600">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.facebook.com/TuPaginaDeFacebook" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Enlaces Rápidos</h5>
              <ul>
                <li className="mb-2 hover:text-gray-300"><a href="#">Política de Privacidad</a></li>
                <li className="mb-2 hover:text-gray-300"><a href="#">Términos de Servicio</a></li>
                <li className="hover:text-gray-300"><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Suscríbete</h5>
              <form>
                <input type="email" placeholder="Tu correo electrónico" className="w-full px-4 py-2 mb-2 text-gray-800" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Suscribir
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Derechos de Autor */}
        <div className="text-center text-sm text-gray-300 mt-8">
          <p>&copy; 2023 Multitienda Emprende. Todos los derechos reservados.</p>
        </div>
      </div>
      {/* Fondo de Onda */}
      
    </footer>
  );
};

export default Footer;

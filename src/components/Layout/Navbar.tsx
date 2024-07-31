"use client";
import React, { useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import MobileMenu from "./Menu/MobileMenu";
import DropdownMenu from "./Menu/DropdownMenu";
import CartModal from "../Cart/CartModal";
import { useCart } from "../Cart/CartContext";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import dynamic from 'next/dynamic';


const DynamicCartCounter = dynamic(() => Promise.resolve(() => {
  const { getItemCount } = useCart();
  return <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{getItemCount()}</span>;
}), { ssr: false });

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCart();

  return (
    <div className="bg-white">
      <MobileMenu open={isMobileMenuOpen} setOpen={setMobileMenuOpen} />
      <CartModal />

      <header className="z-30 relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Envío Gratis para pedidos mayores de 100.000
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <Image
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Company Logo"
                    width={32}
                    height={32}
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <DropdownMenu />

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Iniciar Sesión
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Crear Cuenta
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <ReactCountryFlag countryCode="CO" svg className="h-auto w-5 flex-shrink-0" />
                    <span className="ml-3 block text-sm font-medium">COP</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Buscar</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button className="group -m-2 flex items-center p-2" onClick={openCart}>
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <DynamicCartCounter />
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
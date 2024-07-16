"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../MainPage/Navbar";
import Footer from "../../MainPage/Footer";
import Filter from "../Filter";
import Cards from "../Cards";
import { CartProvider } from "../CartContext";
import { useFilter } from "../Hook/useFilter";
import { categories } from '../allProducts';


export default function TecnologiaPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(categories['belleza'])

  return (
    <CartProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative">
            <Navbar />
            <main className="sandbox">
              <Filter
                pageTitle="Belleza"
                onFilter={filterData}
                onSort={sortData}
              >
                <Cards products={filteredProducts}  category="Belleza"/>
              </Filter>
              <Footer />
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}

"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { CartProvider } from "./Productos/CartContext";
import Navbar from "./MainPage/Navbar";
import Footer from "./MainPage/Footer";
import EmblaCarousel from "./MainPage/Carusel/CarouselUp";
import Hero from "./MainPage/Carusel/Hero";
import CarouselDown from "./MainPage/Carusel/CarouselDown";
import HeroDown from "./MainPage/Carusel/HeroDown";
import Head from 'next/head'; // Asegúrate de importar Head para el SEO
import throttle from 'lodash.throttle'; // Importa throttle de lodash
import CarouselDown2 from "./MainPage/Carusel/CarouselDown2";

const Home = () => {
  const emblaControl = useAnimation();
  const heroControl = useAnimation();
  const carouselDownControl = useAnimation();
  const heroDownControl = useAnimation();

  const emblaRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const carouselDownRef = useRef<HTMLElement | null>(null);
  const heroDownRef = useRef<HTMLElement | null>(null);

  const checkVisibility = (
    ref: React.RefObject<HTMLElement>,
    control: any,
    threshold: number = 0
  ) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight * (1 - threshold) && rect.bottom >= 0;
      if (isVisible) {
        control.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      } else {
        control.start({
          opacity: 0,
          y: 50,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      }
    }
  };

  const handleScroll = useCallback(
    throttle(() => {
      checkVisibility(emblaRef, emblaControl, 0.1);
      checkVisibility(heroRef, heroControl, 0.2);
      checkVisibility(carouselDownRef, carouselDownControl, 0.2);
      checkVisibility(heroDownRef, heroDownControl, 0.2);
    }, 200),
    [] // Dependencias del useCallback
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Cancela cualquier ejecución pendiente de throttle
    };
  }, [handleScroll]);

  return (
    <CartProvider>
      <ParallaxProvider>
        <Head>
          <title>Tu Título de Página</title>
          <meta name="description" content="Descripción de tu página" />
          {/* Otros elementos que necesites en el head */}
        </Head>
        <div className="app-container">
          <Navbar />

          <section className="hero-section" ref={emblaRef}>
            <EmblaCarousel />
          </section>

          <section className="carousel-section" ref={heroRef}>
            <Parallax>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={heroControl}>
                <Hero />
              </motion.div>
            </Parallax>
          </section>

          {/* Repite para otras secciones con sus respectivas referencias y controles */}

          <section className="carousel-down-section" ref={carouselDownRef}>
            <Parallax>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={carouselDownControl}
              >
                <section style={{ background: "white" }}>
                  <CarouselDown />
                </section>
              </motion.div>
            </Parallax>
          </section>


          <section className="hero-down-section" ref={heroDownRef}>
           
      
                <section style={{ background: "white" }}>
                  <HeroDown />
                </section>
             
            
          </section>

          <section className="hero-down-section" ref={heroDownRef}>
            <Parallax>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={heroDownControl}
              >
                <section style={{ background: "white" }}>
                <CarouselDown2/>
                </section>
              </motion.div>
            </Parallax>
          </section>
         
          
          <Footer />
        </div>
      </ParallaxProvider>
    </CartProvider>
  );
};

export default Home;

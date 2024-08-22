'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ZoomableImage from './ImageComponent/ZoomableImage'

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const handleImageSelect = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart - e.touches[0].clientX > 50) {
      // Swipe left
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }

    if (touchStart - e.touches[0].clientX < -50) {
      // Swipe right
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
      } else if (event.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, isLightboxOpen])

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto p-4">
      {/* Miniaturas */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, index) => (
          <motion.div
            key={img}
            className={`relative w-16 h-16 md:w-20 md:h-20 cursor-pointer overflow-hidden rounded-md ${
              selectedIndex === index ? 'ring-2 ring-orange-500' : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300'
            }`}
            onClick={() => handleImageSelect(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={img}
              alt={`Miniatura ${index + 1}`}
              fill
              sizes="(max-width: 768px) 64px, 80px"
              style={{ objectFit: "cover" }}
              className="transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
     
      {/* Imagen Principal */}
      <div className="flex-grow relative order-1 md:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <ZoomableImage
              src={images[selectedIndex]}
              alt={`Imagen principal ${selectedIndex + 1}`}
              onOpenLightbox={() => setIsLightboxOpen(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[selectedIndex]}
              alt={`Imagen a pantalla completa ${selectedIndex + 1}`}
              fill
              style={{ objectFit: "contain" }}
              quality={100}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsLightboxOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  )
}
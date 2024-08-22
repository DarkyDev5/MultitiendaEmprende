'use client'
import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

interface ZoomableImageProps {
  src: string;
  alt: string;
  onOpenLightbox: () => void;
}

export default function ZoomableImage({ src, alt, onOpenLightbox }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
  }, [])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((event.clientX - left) / width) * 100
      const y = ((event.clientY - top) / height) * 100
      setZoomPosition({ x, y })
    }
  }, [])

  return (
    <div
      ref={imageRef}
      className="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onOpenLightbox}
    >
      <div className="w-full h-full relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          style={{
            objectFit: "contain",
          }}
          quality={100}
          priority
        />
      </div>
      {isZoomed && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            backgroundSize: '250%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      {!isZoomed && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
          Pase el mouse para hacer zoom
        </div>
      )}
    </div>
  )
}
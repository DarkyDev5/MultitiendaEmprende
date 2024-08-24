"use client"
import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline/next';

interface Scene3dProps {
  onLoad?: () => void;
}

export default function Scene3d({ onLoad }: Scene3dProps) {
  useEffect(() => {
    // Simula un tiempo de carga si es necesario
    const timer = setTimeout(() => {
      if (onLoad) onLoad();
    }, 1000); // Ajusta este tiempo según sea necesario

    return () => clearTimeout(timer);
  }, [onLoad]);

  return (
    <main>
      <Spline
        scene="https://prod.spline.design/TPd2GXvpQwhlBYus/scene.splinecode"
        onLoad={() => {
          if (onLoad) onLoad();
        }}
      />
    </main>
  );
}
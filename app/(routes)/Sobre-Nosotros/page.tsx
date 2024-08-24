// app/[category]/page.tsx
import React from 'react';
import Scene3d from '@/src/components/About/Scene3d';
import ScrollAnimation from '@/src/components/About/ScrollAnimation';
import VisionMisionCard from '@/src/components/About/VisionMisionCard';
import TiendaOnlineFeatures from '@/src/components/About/Features';
export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Sección Scene3d */}
      <section className="w-full h-screen">
        <Scene3d />
      </section>
      
      {/* Sección ScrollAnimation */}
      <section className="w-full ">
        <ScrollAnimation />
      </section>

      <section className="w-full ">
        <VisionMisionCard />
      </section>

      <section className="w-full ">
        <TiendaOnlineFeatures />
      </section>
    </div>
  );
}

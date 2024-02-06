import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/app.module.css';

interface Card {
  title: string;
  imageSrc: string;
}

const cardData: Card[] = [
  {
    title: 'Monitores',
    imageSrc: '/SliderDown/monitores.png',
  },
  {
    title: 'Maquinas',
    imageSrc: '/SliderDown/maquinas.png',
  },
  {
    title: 'Cremas',
    imageSrc: '/SliderDown/cremas.png',
  },
  {
    title: 'Proteinas',
    imageSrc: '/SliderDown/proteinas.png',
  },
];

const CardComponent: React.FC<{ card: Card, isHovered: boolean, onMouseEnter: () => void, onMouseLeave: () => void }> = ({ card, isHovered, onMouseEnter, onMouseLeave }) => (
  <div
    className={`relative m-4 w-full md:w-40 h-60 transition-all duration-300 transform hover:scale-105 ${isHovered ? 'ring-4 ring-yellow-500 shadow-2xl' : 'shadow-lg'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="absolute top-0 left-0 w-full h-full rounded-lg">
      <Image
        src={card.imageSrc}
        alt={card.title}
        layout="fill"
        objectFit="cover"
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:rotate-12 rounded-lg"
      />
    </div>
    <div 
      className={`absolute bottom-3 left-1 flex items-center justify-center px-7 py-1 rounded-md shadow-md text-black text-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' }}
    >
      <span className="text-lg font-semibold">{card.title}</span>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className={`flex justify-center items-center flex-wrap ${styles.container}`}>
      {cardData.map((card) => (
        <CardComponent 
          key={card.title}
          card={card}
          isHovered={hoveredCard === card.title}
          onMouseEnter={() => setHoveredCard(card.title)}
          onMouseLeave={() => setHoveredCard(null)}
        />
      ))}
    </div>
  );
};

export default Home;

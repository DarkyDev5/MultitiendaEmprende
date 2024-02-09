import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Product = {
  name: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    name: 'Bar Stool',
    image: '/Mini_PC.png',
    description: 'You just want to be comfortable sitting in a bar stool—you want to be comfortable shimmying it up to the bar, closer to your lover, or back slightly to include a third person in the conversation.',
  },
  {
    name: 'Wireless Headphones',
    image: '/Audifonos.png',
    description: 'Immerse yourself in the world of music with our premium wireless headphones. Experience crystal-clear sound and comfortable design.',
  },
  {
    name: 'Product 3',
    image: '/Audifonos.png',
    description: 'Highlight the features and benefits of your amazing product. Convince customers why they need it.',
  },
];

type ArrowButtonProps = {
  direction: 'back' | 'forward';
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`slide ${direction}`}
    className={twMerge('focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100', direction === 'back' ? 'hidden md:flex items-center' : '')}
  >
    <svg
      className="w-10 h-10 lg:w-16 lg:h-16"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === 'back' ? 'M40 16L24 32L40 48' : 'M24 16L40 32L24 48'}
        stroke="#1F2937"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  const goPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);

  const currentProduct = products[currentIndex];

  return (
    <div className={twMerge('2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4')}>
      <div className={twMerge('lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-900')}>
        <div className={twMerge('flex md:flex-row flex-col')}>
          <ArrowButton direction="back" onClick={goPrev} />
          <div className={twMerge('md:w-1/2 h-96 relative overflow-hidden')}>
            <div className={twMerge('w-full h-full')}>
              <Image
                src={currentProduct.image}
                alt={`Slide ${currentIndex + 1}`}
                layout="fill"
                objectFit="contain"
                className={twMerge('transition-all duration-500 ease-in-out')}
              />
            </div>
          </div>
          <ArrowButton direction="forward" onClick={goNext} />
          <div className={twMerge('md:w-1/2 bg-gray-50 px-4 md:py-20 py-6 md:px-6 lg:py-24 transition-all duration-500 ease-in-out')}>
            <h1 className={twMerge('text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white')}>{currentProduct.name}</h1>
            <p className={twMerge('text-base leading-normal text-gray-600 dark:text-white mt-2 overflow-auto h-20')}>
              {currentProduct.description}
            </p>
            <div className={twMerge('flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16')}>
              <button className={twMerge('w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700')}>Add to Cart</button>
              <button className={twMerge('w-full md:w-2/5 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 ')}>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

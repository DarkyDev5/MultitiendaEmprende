import React, { useState } from 'react';
import Image from 'next/image';
import { getSafeImageUrl } from '@/lib/utils';

interface SafeImageProps {
  src: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(getSafeImageUrl(src));

  return (
    <Image 
      src={imgSrc}
      alt={alt}
      layout="fill" 
      objectFit="cover" 
      className="rounded"
      onError={() => setImgSrc('/placeholder-image.png')}
    />
  );
};
import React from "react";
import { motion } from "framer-motion";

interface PreviewImagesProps {
  images: string[];
}

export default function PreviewImages({ images }: PreviewImagesProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((src, index) => (
        <motion.img 
          key={src}
          src={src}
          alt={`Preview ${index + 1}`}
          className="w-full h-32 object-cover rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}
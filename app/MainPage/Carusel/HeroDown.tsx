// components/MyComponent.tsx

import Image from 'next/image';
import { motion } from 'framer-motion';

const MyComponent = () => {
    // Funciones para manejar eventos (ejemplo)
    const handleImageClick = (imageId: number) => {
        console.log(`Imagen ${imageId} fue clickeada.`);
        // Aquí puedes agregar lógica, como abrir una modal, navegar, etc.
    }

    return (
        <div className="bg-white text-center py-10">
             <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-5"
            >
                Título
            </motion.h1>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl mb-5"
            >
                Subtítulo 1
            </motion.h2>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-3xl mb-10"
            >
                Subtítulo 2 - Presionar
            </motion.h2>
            <div className="flex flex-wrap justify-center items-start gap-10">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-[800px] h-[1200px] relative mb-10 shadow-lg"
                    onClick={() => handleImageClick(1)}
                >
                    <Image src="/mujerlinda.jpg" alt="Imagen 1" layout="fill" objectFit="contain" />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-[800px] h-[1200px] relative mt-20 shadow-lg"
                    onClick={() => handleImageClick(2)}
                >
                    <Image src="/mujerlinda.jpg" alt="Imagen 2" layout="fill" objectFit="contain" />
                </motion.div>
            </div>
            {/* Botones de acción */}
           
        </div>
    );
}

export default MyComponent;

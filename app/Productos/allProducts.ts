import { Product, DetailedProduct } from "./types";
export const categories: Record<string, DetailedProduct[]> = {

    cocina: [
        {
            id: "20",
            name: "Maquinas De Obleas Lisa 16CM",
            price: 150.0,
            image: "/Cocina/MO lisa 16 cm.png",
            rating: 4,
            filter: "Maquinas de Obleas",
            category: "Cocina",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
          {
            id: "21",
            name: "Maquinas De Obleas Lisa 16CM",
            price: 200.0,
            image: "/Cocina/MO lisa 16 cm.png",
            rating: 5,
            filter: "Electrodomésticos",
            category: "Cocina",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
    ],
    tecnologia: [
        {
            id: "1",
            name: "CCA CRA - Auriculares para monitor intraural IEM",
            price: 79900,
            image: "/Audifonos.png",
            rating: 5,
            filter: "Audífonos",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "LOL"
          },
        
          {
            id: "2",
            name: "Sceptre IPS - Monitor de 22 pulgadas 1080p 75Hz",
            price: 354500,
            image: "/Monitor1.png",
            rating: 5,
            filter: "Monitores",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "3",
            name: "Acer Hub USB C, divisor USB C a HDMI",
            price: 75550,
            image: "/tecnologia/AcerHub.jpg",
            rating: 5,
            filter: "Accesorios",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "4",
            name: "[Certificado Apple MFi] Paquete de 6 cargadores de iPhone (3/3/6/6/6/10 pies)",
            price: 41904,
            image: "/tecnologia/CablesCargadores.jpg",
            rating: 5,
            filter: "Accesorios",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "5",
            name: "Sceptre LED - Monitor de 22 pulgadas 1080p 75Hz",
            price: 75550,
            image: "/tecnologia/MonitorLED.jpg",
            rating: 5,
            filter: "Monitores",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "6",
            name: " TRIGKEY Mini PC Ryzen 7 W11 Pro Desktop",
            price: 1295400,
            image: "/Mini_PC.png",
            rating: 5,
            filter: "Computadores",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "7",
            name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
            price: 79990,
            image: "/tecnologia/Audifonos2.jpg",
            rating: 5,
            filter: "Audífonos",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "8",
            name: "UGREEN Revodok USB C Hub 5 en 1 ",
            price: 79990,
            image: "/tecnologia/USBHUB.jpg",
            rating: 5,
            filter: "Accesorios",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "9",
            name: "Beelink Mini PC S12 Pro",
            price: 79990,
            image: "/tecnologia/Mini_PCINTEL.jpg",
            rating: 5,
            filter: "Computadores",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "10",
            name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
            price: 79990,
            image: "/tecnologia/Audifonos2.jpg",
            rating: 5,
            filter: "Audífonos",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "11",
            name: "Spray limpiador de pantalla (16 onzas)",
            price: 47990,
            image: "/tecnologia/limpiadorpantalla.jpg",
            rating: 5,
            filter: "Audífonos",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
        
          {
            id: "12",
            name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
            price: 79990,
            image: "/tecnologia/Audifonos2.jpg",
            rating: 5,
            filter: "Audífonos",
            category: "Tecnologia",
            description: "Descripción detallada de la máquina de obleas",
            additionalInfo: "Información adicional de la máquina de obleas"
          },
    ],
    // Puedes agregar más categorías de productos si las tienes.
  };


  export const subcategories: Record<string, Record<string, Product[]>> = {
    tecnologia: {
      audifonos: [
        {
          id: "12",
          name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
          price: 79990,
          image: "/tecnologia/Audifonos2.jpg",
          rating: 5,
          filter: "Audífonos",
          category: "Tecnologia"
        },
        
      ],
      monitores: [
        {
          id: "2",
          name: "Sceptre IPS - Monitor de 22 pulgadas 1080p 75Hz",
          price: 354500,
          image: "/Monitor1.png",
          rating: 5,
          filter: "Monitores",
          category: "Tecnologia"
        },
      ],
      accesorios: [
        // Tus productos de accesorios aquí...
      ],
      computadores: [
        // Tus productos de computadores aquí...
      ],
      // Más subcategorías de tecnología...
    },
    // Más categorías con subcategorías...
  };
// data.tsx
export const navigation = {


    categories: [
      {
        id: 'Productos',
        name: 'Productos',
        featured: [
          {
            name: 'Proteinas',
            href: '#',
            imageSrc: '/Cocina/deporteinicio.png',
            imageAlt: 'deporteinicio.',
          },
          {
            name: 'Ofertas',
            href: '#',
            imageSrc: '/Ofertas/rebajas.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'Tecnologia',
            name: 'Tecnologia',
            items: [
              { name: 'Computadores', href: '#' },
              { name: 'Monitores', href: '#' },
              { name: 'Discos-Duros', href: '#' },
              { name: 'Accesorios', href: '#' }
            ],
          },
          {
            id: 'Cocina',
            name: 'Cocina',
            items: [
              { name: 'Maquinas Obleas Trabajo Liviano', href: '#' },
              { name: 'Maquinas Obleas Semi Industrial', href: '#' },
              { name: 'Maquinas Pela Mangos', href: '#' },
              { name: 'Electrodomésticos de Cocina', href: '#' },
            ],
          },
          {
            id: 'Belleza',
            name: 'Belleza',
            items: [
              { name: 'Maquillaje', href: '#' },
              { name: 'Cremas', href: '#' },
            ],
          },
        ],
      },
    ],
    pages: [
      { name: 'Marcas', href: '#' },
      { name: 'Sobre Nosotros', href: '/Sobre-Nosotros' },
    ],
  }
  
// data.tsx
export const navigation = {


    categories: [
      {
        id: 'Productos',
        name: 'Productos',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
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
              { name: 'Audifonos', href: '#' },
              { name: 'Accesorios', href: '#' }
            ],
          },
          {
            id: 'Cocina',
            name: 'Cocina',
            items: [
              { name: 'Maquinas Obleas Trabajo Liviano', href: '#' },
              { name: 'Maquinas Obleas Semi Industrial', href: '#' },
              { name: 'Bags', href: '#' },
              { name: 'Sunglasses', href: '#' },
              { name: 'Hats', href: '#' },
              { name: 'Belts', href: '#' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Full Nelson', href: '#' },
              { name: 'My Way', href: '#' },
              { name: 'Re-Arranged', href: '#' },
              { name: 'Counterfeit', href: '#' },
              { name: 'Significant Other', href: '#' },
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
  
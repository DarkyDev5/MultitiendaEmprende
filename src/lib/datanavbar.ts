// src/lib/datanavbar.ts

export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationSection {
  id: string;
  name: string;
  items: NavigationItem[];
}

export interface FeaturedItem {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface NavigationCategory {
  name: string;
  sections: NavigationSection[];
  featured: FeaturedItem[];
}

interface Navigation {
  categories: NavigationCategory[];
  pages: NavigationItem[];
}

export const navigation: Navigation = {
  categories: [
    {
      name: 'Productos',
      sections: [
        {
          id: 'Tecnologia',
          name: 'Tecnología',
          items: [
            { name: 'Computadores', href: '/Productos/Tecnologia/Computadores' },
            { name: 'Monitores', href: '/Productos/Tecnologia/Monitores' },
            { name: 'Discos Duros', href: '/Productos/Tecnologia/Discos-Duros' },
            { name: 'Accesorios', href: '/Productos/Tecnologia/Accesorios' },
          ],
        },
        {
          id: 'Cocina',
          name: 'Cocina',
          items: [
            { name: 'Máquinas Obleas Trabajo Liviano', href: '/Productos/Cocina/Maquinas-Obleas-Trabajo-Liviano' },
            { name: 'Máquinas Obleas Semi Industrial', href: '/Productos/Cocina/Maquinas-Obleas-Semi-Industrial' },
            { name: 'Máquinas Pela Mangos', href: '/Productos/Cocina/Maquinas-Pela-Mangos' },
            { name: 'Electrodomésticos de Cocina', href: '/Productos/Cocina/Electrodomesticos-de-Cocina' },
          ],
        },
        {
          id: 'Belleza',
          name: 'Belleza',
          items: [
            { name: 'Maquillaje', href: '/Productos/Belleza/Maquillaje' },
            { name: 'Cremas', href: '/Productos/Belleza/Cremas' },
          ],
        },
      ],
      featured: [
        {
          name: 'Proteínas',
          href: '/Productos/Proteinas',
          imageSrc: '/Cocina/deporteinicio.png',
          imageAlt: 'Proteínas para deportistas',
        },
        {
          name: 'Ofertas',
          href: '/Ofertas',
          imageSrc: '/Ofertas/rebajas.jpg',
          imageAlt: 'Ofertas especiales',
        },
      ],
    },
  ],
  pages: [
    { name: 'Marcas', href: '/Marcas' },
    { name: 'Sobre Nosotros', href: '/Sobre-Nosotros' },
  ],
};
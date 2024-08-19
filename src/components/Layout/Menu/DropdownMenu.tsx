// app/components/DropdownMenu.tsx
'use client'

import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/src/lib/datanavbar';

export default function DropdownMenu() {
  return (
    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation.categories.map((category) => (
          <Popover key={category.name} className="flex">
            {({ open }) => (
              <>
                <div className="relative flex">
                  <Popover.Button
                    className={`
                      relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      ${open ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-700 hover:text-gray-800"}
                    `}
                  >
                    <motion.span
                      animate={{ scale: open ? 1.05 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {category.name}
                    </motion.span>
                  </Popover.Button>
                </div>

                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                    <div
                      className="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />

                    <div className="relative bg-white">
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="col-start-2 grid grid-cols-2 gap-x-8"
                          >
                            {category.featured.map((item) => (
                              <motion.div
                                key={item.name}
                                whileHover={{ scale: 1.05 }}
                                className="group relative text-base sm:text-sm"
                              >
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <Image
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                </div>
                                <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </Link>
                                <p aria-hidden="true" className="mt-1">Comprar Ahora</p>
                              </motion.div>
                            ))}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                          >
                            {category.sections.map((section) => (
                              <div key={section.name}>
                                <p id={`${section.id}-heading`} className="font-medium text-gray-900">
                                  <Link href={`/Productos/${section.id}`}>{section.name}</Link>
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${section.name}-heading`}
                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  {section.items.map((item) => (
                                    <motion.li
                                      key={item.name}
                                      className="flex"
                                      whileHover={{ x: 5 }}
                                      transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                      <Link href={`/Productos/${section.id}/${item.name}`}>
                                        {item.name}
                                      </Link>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}

        {navigation.pages.map((page) => (
          <motion.a
            key={page.name}
            href={page.href}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page.name}
          </motion.a>
        ))}
      </div>
    </Popover.Group>
  );
}
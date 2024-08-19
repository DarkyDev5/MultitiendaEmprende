'use client'

import { Fragment } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { navigation } from '@/src/lib/datanavbar'

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Categories */}
              <div className="mt-2">
                {navigation.categories.map((category) => (
                  <Disclosure as="div" key={category.name} className="border-b border-gray-200">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between p-4 text-gray-900">
                          <span className="font-medium">{category.name}</span>
                          <ChevronDownIcon
                            className={`h-5 w-5 ${open ? 'rotate-180' : ''} transition-transform`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-2">
                          {category.sections.map((section) => (
                            <div key={section.id}>
                              <h3 className="text-sm font-medium text-gray-900 mb-2">{section.name}</h3>
                              <ul className="space-y-2">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link href={item.href} className="text-gray-500 hover:text-gray-900">
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {category.featured.length > 0 && (
                            <div className="mt-6">
                              <h3 className="text-sm font-medium text-gray-900 mb-2">Destacados</h3>
                              <ul className="space-y-4">
                                {category.featured.map((item) => (
                                  <li key={item.name} className="flex">
                                    <Link href={item.href} className="flex items-center">
                                      <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover"
                                      />
                                      <span className="ml-4 text-gray-900">{item.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>

              {/* Pages */}
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Sign in / Create account */}
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
                    Iniciar Sesión
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
                    Crear Cuenta
                  </Link>
                </div>
              </div>

              {/* Currency selector */}
              <div className="border-t border-gray-200 px-4 py-6">
                <Link href="#" className="-m-2 flex items-center p-2">
                  <Image
                    src="/images/flags/flag-colombia.svg"
                    alt="Bandera de Colombia"
                    className="block h-auto w-5 flex-shrink-0"
                    width={20}
                    height={15}
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">COP</span>
                  <span className="sr-only">, cambiar moneda</span>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
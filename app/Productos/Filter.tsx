"use client";
import { Fragment, useState, SetStateAction, Dispatch } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { Product } from "./types";
import Cards from "./Cards";

import MobileFilterDialog from "./MobileFilter";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
export const subCategories = [
  { name: "Monitores", href: "#" },
  { name: "Audifonos", href: "#" },
  { name: "Computadores", href: "#" },
  { name: "Accesorios", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface FilterProps {
  selectedFilter: string | null;
  onFilterClick: (filterName: string | null) => void;
  pageTitle: string;
  subCategories: { name: string; href: string }[];
  children: React.ReactNode;
}
export default function Filter({
  selectedFilter,
  onFilterClick,
  pageTitle,
  children,
  subCategories,
}: FilterProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterClick = (filterName: string) => {
    onFilterClick(filterName);
    console.log("Clicked on filter:", filterName);
  };
  const clearSelectedFilter = () => {
    onFilterClick(null); // Ahora 'null' es un valor válido según la firma de la función
  };
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          subCategories={subCategories}
          filters={filters}
        />

        <main className=" mx-auto px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {pageTitle}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul className="mt-6 space-y-6">
                  {subCategories.map((filter) => (
                    <li key={filter.name} className="mb-4">
                      <div
                        className={classNames(
                          "group flex items-center px-4 py-3 text-sm font-semibold rounded-md relative",
                          selectedFilter === filter.name
                            ? "bg-blue-500 text-white border-l-2 border-blue-700 shadow-md"
                            : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 border border-gray-200 transition duration-300 ease-in-out"
                        )}
                      >
                        <a
                          href={filter.href}
                          className="group flex items-center flex-grow transition duration-300 ease-in-out"
                          onClick={() => onFilterClick(filter.name)}
                        >
                          {filter.name}
                        </a>

                        {selectedFilter && selectedFilter === filter.name && (
                          <div className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-300 ease-in-out">
                            <span onClick={() => onFilterClick(null)}>
                              <XMarkIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Botón "X" para limpiar la categoría seleccionada */}

              {/* Product grid */}
              <div className="lg:col-span-3 px-0">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

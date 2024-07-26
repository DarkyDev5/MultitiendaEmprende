// useClient.ts
import { useState } from 'react';

export function useClient() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Nuevo state

  const toggleMobileFilters = () => {
    setMobileFiltersOpen((prevState) => !prevState);
  };

  const selectFilter = (filter: string) => {
    setSelectedCategory(filter);
    setMobileFiltersOpen(false);
  };

  return {
    mobileFiltersOpen,
    toggleMobileFilters,
    selectedCategory,
    selectFilter,
  };
}

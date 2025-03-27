// lift the filter state to the layout using React Context. This way:
// AppHeader can update the filters.
// Treater (and Menu) can access the filters without needing to pass props manually.
// Find your layout component (e.g., MainLayout.jsx) and wrap the <Outlet /> in FilterProvider.

import { createContext, useContext, useState } from "react";

// Create Context
const FilterContext = createContext();

// Custom Hook to Use the Context
export function useFilters() {
  return useContext(FilterContext);
}

// Context Provider
export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    sort: null,
    cuisine: null,
    category: null,
    location: null,
  });

  // Reset all filters to their initial state
  const resetFilters = () => {
    setFilters({
      sort: null,
      cuisine: null,
      category: null,
      location: null,
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

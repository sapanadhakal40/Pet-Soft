"use client";

import { Pet } from "@/lib/types";
import { useState } from "react";
import { createContext } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};
type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  //state
  const [searchQuery, setSearchQuery] = useState("");

  //derived state

  //handlers
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

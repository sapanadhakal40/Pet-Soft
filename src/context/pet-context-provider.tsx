"use client";

import { Pet } from "@/lib/types";
import { useState } from "react";
import { createContext } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  selectedPet: Pet | undefined;
  handleChangeSelectedPetId: (id: number) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  //handlers
  const handleChangeSelectedPetId = (id: number) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

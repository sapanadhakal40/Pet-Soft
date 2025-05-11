"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { useOptimistic, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: number) => void;
  handleChangeSelectedPetId: (id: number) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: number, newPetData: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [
        ...state,
        {
          ...newPet,
          id: state.length + 1,
        },
      ];
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: number, newPetData: Omit<Pet, "id">) => {
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: number) => {
    await deletePet(petId);

    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = async (id: number) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

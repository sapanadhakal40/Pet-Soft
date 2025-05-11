"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  // Filter pets
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );
  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-4 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet Image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

// https://bytegrad.com/course-assets/projects/petsoft/api/pets

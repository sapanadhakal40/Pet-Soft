import Image from "next/image";
import { Pet } from "@/lib/types";

type PetListProps = {
  pets: Pet[];
};
export default function PetList({ pets }: PetListProps) {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-4 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
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

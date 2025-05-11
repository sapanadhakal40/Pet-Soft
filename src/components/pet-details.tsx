"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="h-full w-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet | undefined;
};

function TopBar({ pet }: Props) {
  return (
    <div className="flex items-center bg-white px-8 py-5 boredr-b border-light">
      <Image
        src={pet?.imageUrl || "/default-pet.jpg"}
        alt="Selected pet image"
        width={75}
        height={75}
        className="w-[75px] h-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton actionType="checkout">Checkout</PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <div>
      <section className="bg-white flex-1 px-7 py-5 rounded-md mb-9 mx-8 border border-light">
        {pet?.notes}
      </section>
    </div>
  );
}

function EmptyView() {
  return (
    <p className="h-full flex justify-center items-center text-2xl font-medium">
      No Pet selected
    </p>
  );
}

"use server";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validations";
// import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
  // await sleep(2000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }

  const DEFAULT_IMAGE =
    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }
  revalidatePath("/app", "layout");
}
export async function editPet(petId: unknown, newPetData: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error editing pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid data",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Error deleting pet",
    };
  }
  revalidatePath("/app", "layout");
}

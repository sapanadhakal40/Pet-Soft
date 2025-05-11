"use server";
import prisma from "@/lib/db";
// import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
export async function addPet(formData) {
  // await sleep(2000);
  const DEFAULT_IMAGE =
    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || DEFAULT_IMAGE,
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }
  revalidatePath("/app", "layout");
}
export async function editPet(petId, formData) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "Error editing pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Error deleting pet",
    };
  }
  revalidatePath("/app", "layout");
}

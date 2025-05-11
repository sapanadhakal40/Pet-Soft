"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function addPet(formData) {
  const DEFAULT_IMAGE =
    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

  console.log(formData);
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      imageUrl: formData.get("imageUrl") || DEFAULT_IMAGE,
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  });
  revalidatePath("/app", "layout");
}

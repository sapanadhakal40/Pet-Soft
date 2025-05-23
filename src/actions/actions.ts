"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { authFormSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

// import { sleep } from "@/lib/utils";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//-----User actions-----//

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid email or password",
          };
        }
        default: {
          return {
            message: "Could not log in",
          };
        }
      }
    }
    throw error; // rethrow the error if it's not an AuthError
  }
}

export async function signUp(prevstate: unknown, formData: unknown) {
  //check if formData is formData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  //convert formdata to object
  const formDataEntries = Object.fromEntries(formData.entries());

  //validation
  const validatedFormData = authFormSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }
  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists",
        };
      }
    }
    return {
      message: "Error creating user",
    };
  }
  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

//----PET CRUD ACTIONS----//
export async function addPet(pet: unknown) {
  // await sleep(2000);

  const session = await checkAuth();

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
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }
  revalidatePath("/app", "layout");
}
export async function editPet(petId: unknown, newPetData: unknown) {
  //auth check
  const session = await checkAuth();

  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }
  //authorization check
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }

  //database action
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
  //auth check
  const session = await checkAuth();
  //validation

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid data",
    };
  }
  //authorization check(users own pet)
  const pet = await getPetById(validatedPetId.data);

  // select: {
  //   userId: true,
  // },

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
    };
  }

  //database action
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

//-----Payment actions-----//

export async function createCheckoutSession() {
  // auth check
  const session = await checkAuth();

  //create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1ROAkJ2VP3k3xDTQteQ2QL1v",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?canceled=true`,
  });

  redirect(checkoutSession.url);
}

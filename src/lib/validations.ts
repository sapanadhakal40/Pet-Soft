import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.number().int().positive().default(0);

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(50),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(50),

    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid URL" }),
    ]),

    age: z.coerce.number().int().positive().max(9999),
    notes: z.union([z.literal(""), z.string().trim().max(500)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authFormSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuthForm = z.infer<typeof authFormSchema>;

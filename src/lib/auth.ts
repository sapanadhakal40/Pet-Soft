import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToaccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingToaccessApp) {
        return false;
      }
      if (isLoggedIn && isTryingToaccessApp) {
        return true;
      }
      if (isLoggedIn && !isTryingToaccessApp) {
        return Response.redirect(new URL("app/dashboard", request.nextUrl));
      }
      if (!isLoggedIn && !isTryingToaccessApp) {
        return true;
      }
      return false;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);

import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./server-utils";
import { authFormSchema } from "./validations";

const prisma = new PrismaClient();

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        //validation of object
        const validatedFormData = authFormSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }
        //extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);
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
      if (isLoggedIn && isTryingToaccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToaccessApp && auth?.user.hasAccess) {
        return true;
      }
      if (isLoggedIn && !isTryingToaccessApp) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          (request.nextUrl.pathname.includes("/signup") &&
            !auth?.user.hasAccess)
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }
      if (!isLoggedIn && !isTryingToaccessApp) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      // runs on every request
      if (user) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);

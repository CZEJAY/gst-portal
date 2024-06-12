// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prismadb from "./lib/prisma";
import { ValidationError } from "./lib/utils";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials || {};
        console.log("Logging in..........");
        try {
          if (!username || !password) {
            throw new ValidationError("Username and password are required.");
          }

          const user = await prismadb.registrars.findUnique({
            where: { name: username as string },
          });

          if (!user) {
            throw new ValidationError("User not found.");
          }

          const convertedPass = String(password);
          const isValid = await bcrypt.compare(convertedPass, user.password);

          if (!isValid) {
            throw new ValidationError("Invalid password.");
          }

          return user;
        } catch (error: any) {
          if (error instanceof ValidationError) {
            throw error;
          }
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/new-verification",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("JWT CALLBACK => ", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
        };
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token, user }) {
      // console.log("SESSION CALLBACK => ", { session, token, user });
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
          },
        };
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default authOptions;

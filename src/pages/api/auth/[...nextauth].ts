import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    /*CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: 
      },
      authorize(credentials, req) {
        const { email, password } = credentials;
      }
    })*/
  ],
  /*session: {
    strategy: "jwt",
  },*/
  secret: process.env.JWT_SECRET,
  callbacks: {
    /*async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }*/
  },
  events: {},
  pages: {
    signIn: "/signin",
    //signOut: '/auth/signout',
    //newuser: null
  },
});

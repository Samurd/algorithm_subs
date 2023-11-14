import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        /** The user's postal address. */
        id: string
        plan: string
      } & DefaultSession["user"] // To keep the default types
    }
}
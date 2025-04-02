import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
import bcrypt from "bcryptjs";
import client from "@/app/lib/db";
import type { User } from "@/types/definitions";

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await client.user.findFirst({ where: { email } });
    return user || null;
  } catch (error) {
    console.error("❌ Failed to fetch user:", error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const parsedCredentials = schema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("❌ Invalid credentials format");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        if (!user.password) {
          console.log("❌ User has no password set");
          return null;
        }

        try {
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log("❌ Incorrect password");
            return null;
          }
        } catch (error) {
          console.error("❌ Password verification failed:", error);
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          z_sign: user.z_sign,
        };
      },
    }),
  ],
});

import type { NextAuthConfig } from "next-auth";

type JWTUser = {
  id: string;
  name: string;
  email: string;
  z_sign: string | null;
};

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.z_sign = token.z_sign as string | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.z_sign = (user as JWTUser).z_sign;
      }
      return token;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/home") ||
        nextUrl.pathname.startsWith("/work") ||
        nextUrl.pathname.startsWith("/people") ||
        nextUrl.pathname.startsWith("/finance") ||
        nextUrl.pathname.startsWith("/health") ||
        nextUrl.pathname.startsWith("/mood") ||
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/compatibility");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

import "next-auth";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

declare module "next-auth" {
  interface Session {
    user: Omit<User, "password">;
  }
}

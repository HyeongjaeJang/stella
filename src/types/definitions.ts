import "next-auth";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  z_sign: string | null;
  birth_date: Date | null;
  birth_time: Date | null;
  gender: string | null;
  city_country: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      z_sign: string | null;
    };
  }
}

"use server";

import client from "./db";
import bcrypt from "bcryptjs";
import { getZodiac } from "./ai";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

type userData = {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  birth_time: string;
  gender: string;
  city_country: string;
};

export async function createUser(userData: userData) {
  try {
    // Check for duplicate email
    const existingUser = await client.user.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) {
      console.log(existingUser);
      return { success: false, message: "Email already exists." };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const zodiacSign = await getZodiac(userData);
    console.log("Zodiac sign:", zodiacSign);

    // Create a new user
    const newUser = await client.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        birth_date: userData.birth_date ? new Date(userData.birth_date) : null,
        birth_time: userData.birth_time
          ? new Date(`1970-01-01T${userData.birth_time}Z`)
          : null,
        gender: userData.gender,
        city_country: userData.city_country,
        z_sign: zodiacSign,
      },
    });

    const newUserId = newUser.id;

    return { success: true, userId: newUserId };
  } catch (error) {
    console.error("❌ Signup error:", error);
    return { success: false, message: "Error occurred! Something went wrong." };
  }
}

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

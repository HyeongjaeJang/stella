"use server";

import client from "./db";
import argon2 from "argon2";

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  birth_time: string;
  gender: string;
  city_country: string;
  z_sign: string;
}) {
  try {
    // Check for duplicate email
    const existingUser = await client.user.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) {
      return { success: false, message: "Email already exists." };
    }

    const hashedPassword = await argon2.hash(userData.password);

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
        z_sign: userData.z_sign,
      },
    });

    const newUserId = newUser.id;

    return { success: true, userId: newUserId };
  } catch (error) {
    console.error("❌ Signup error:", error);
    return { success: false, message: "Error occurred! Something went wrong." };
  }
}

// // Find user by email (Can be used for login)
// export async function getUserByEmail(email: string) {
//   try {
//     const user = await db("users").where({ email }).first();
//     return user || null;
//   } catch (error) {
//     console.error("❌ User search error:", error);
//     return null;
//   }
// }

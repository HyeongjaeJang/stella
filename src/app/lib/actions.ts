"use server";

import client from "./db";
import bcrypt from "bcryptjs";
import { getZodiac, getZodiacData } from "./ai";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { userData } from "@/types/types";
import { startOfToday } from "date-fns";

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

export async function getZodiacInfo(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;

    const exToday = await client.today.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });

    const exFinance = await client.todays_finance.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });

    const exHealth = await client.todays_health.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });

    const exWork = await client.todays_work.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });

    const exRelationship = await client.todays_relationship.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });

    const exMood = await client.todays_mood.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });
    if (
      !exToday &&
      !exFinance &&
      !exHealth &&
      !exWork &&
      !exRelationship &&
      !exMood
    ) {
      const data = {
        name: user.name,
        birth_date: user?.birth_date?.toISOString(),
        birth_time: user?.birth_time?.toISOString(),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getZodiacData(data);
      if (!res) return;

      const userId = user.id;

      await client.today.create({
        data: {
          user_id: userId,
          ...res.today,
        },
      });

      await client.todays_finance.create({
        data: {
          user_id: userId,
          ...res.finance,
        },
      });

      await client.todays_health.create({
        data: {
          user_id: userId,
          ...res.health,
        },
      });

      await client.todays_work.create({
        data: {
          user_id: userId,
          ...res.work,
        },
      });

      await client.todays_relationship.create({
        data: {
          user_id: userId,
          ...res.relationship,
        },
      });

      await client.todays_mood.create({
        data: {
          user_id: userId,
          ...res.mood,
        },
      });
      console.log("✅ All zodiac-related data inserted successfully.");
    }
    console.log("zodiac datas exist in db");
  } catch (error) {
    console.error("❌ Get zodiac info error:", error);
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

export async function getUser() {
  try {
    return await auth();
  } catch (error) {
    console.error("❌ Auth error:", error);
  }
}

export async function LogOut() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error("❌ Sign out error:", error);
  }
}

export async function getToday(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;

    const exToday = await client.today.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today error:", error);
  }
}

export async function getTodayWork(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;

    const exToday = await client.todays_work.findFirst({
      where: {
        user_id: user.id,
        created_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today work error:", error);
  }
}

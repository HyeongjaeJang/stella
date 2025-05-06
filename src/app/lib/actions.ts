"use server";

import client from "./db";
import bcrypt from "bcryptjs";
import {
  getWeeklyFinance,
  getWeeklyHealth,
  getWeeklyMood,
  getWeeklyPeople,
  getWeeklyWork,
  getZodiac,
  getZodiacData,
} from "./ai";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { userData } from "@/types/types";
import { startOfToday, isBefore, endOfWeek, startOfWeek } from "date-fns";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
          ? new Date(`${userData.birth_date}T${userData.birth_time}Z`)
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

    const userId = user.id;

    const existingToday = await client.today.findFirst({
      where: {
        user_id: userId,
        updated_at: {
          gte: startOfToday(),
        },
      },
    });

    if (existingToday) {
      console.log("🟡 Today's data already exists");
      return;
    }

    const data = {
      name: user.name,
      birth_date: user?.birth_date?.toISOString(),
      birth_time: user?.birth_time?.toISOString().slice(11, 16),
      gender: user.gender,
      city: user.city_country,
      z_sign: user.z_sign,
    };

    const res = await getZodiacData(data);
    if (!res) return;

    (["number", "total_score"] as const).forEach((key) => {
      if (typeof res.today[key] !== "number") {
        throw new Error(`Invalid data: today.${key} is not a number`);
      }
    });

    (["income", "expense", "invest"] as const).forEach((key) => {
      if (typeof res.finance[key] !== "number") {
        throw new Error(`Invalid data: finance.${key} is not a number`);
      }
    });

    await client.$transaction([
      client.today.upsert({
        where: { user_id: userId },
        update: { ...res.today, updated_at: new Date() },
        create: { user_id: userId, ...res.today },
      }),
      client.todays_finance.upsert({
        where: { user_id: userId },
        update: { ...res.finance, updated_at: new Date() },
        create: { user_id: userId, ...res.finance },
      }),
      client.todays_health.upsert({
        where: { user_id: userId },
        update: { ...res.health, updated_at: new Date() },
        create: { user_id: userId, ...res.health },
      }),
      client.todays_work.upsert({
        where: { user_id: userId },
        update: { ...res.work, updated_at: new Date() },
        create: { user_id: userId, ...res.work },
      }),
      client.todays_relationship.upsert({
        where: { user_id: userId },
        update: { ...res.relationship, updated_at: new Date() },
        create: { user_id: userId, ...res.relationship },
      }),
      client.todays_mood.upsert({
        where: { user_id: userId },
        update: { ...res.mood, updated_at: new Date() },
        create: { user_id: userId, ...res.mood },
      }),
    ]);

    console.log("✅ All zodiac-related data upserted successfully.");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("💥 Prisma error:", error.code, error.message);
    } else {
      console.error("❌ Get zodiac info error:", error);
    }
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

export async function getUserInfo(id: string) {
  try {
    const parseId = parseInt(id);
    return await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
  } catch (error) {
    console.error("❌ Get user info error:", error);
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
        updated_at: {
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
        updated_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today work error:", error);
  }
}

export async function getTodayPeople(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;

    const exToday = await client.todays_relationship.findFirst({
      where: {
        user_id: user.id,
        updated_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today people error:", error);
  }
}

export async function getTodayFinance(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;
    const exToday = await client.todays_finance.findFirst({
      where: {
        user_id: user.id,
        updated_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today finance error:", error);
  }
}

export async function getTodayHealth(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;
    const exToday = await client.todays_health.findFirst({
      where: {
        user_id: user.id,
        updated_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today health error:", error);
  }
}

export async function getTodayMood(email: string) {
  try {
    const user = await client.user.findFirst({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;
    const exToday = await client.todays_mood.findFirst({
      where: {
        user_id: user.id,
        updated_at: {
          gte: startOfToday(),
        },
      },
    });
    return exToday;
  } catch (error) {
    console.error("❌ Get today mood error:", error);
  }
}

export async function getWeeklyWorkData(id: string) {
  try {
    const parseId = parseInt(id);
    const user = await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
    if (!user) return null;

    const userId = user.id;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weeklyData = await client.weekly_work.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (weeklyData && isBefore(weeklyData.week_start, weekStart)) {
      await client.weekly_work.delete({ where: { user_id: user.id } });
      console.log("🗑️ Deleted old weekly_work data");
    }

    const latest = await client.weekly_work.findFirst({
      where: {
        user_id: userId,
        week_start: { gte: weekStart },
      },
    });

    if (!latest) {
      const data = {
        name: user.name,
        birth_date: user.birth_date?.toISOString(),
        birth_time: user.birth_time?.toISOString().slice(11, 16),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getWeeklyWork(data);
      if (!res) return;

      const saved = await client.weekly_work.create({
        data: {
          user_id: userId,
          week_start: weekStart,
          week_end: weekEnd,
          total_score: res.total_score,
          summary: res.summary,
          productivity: res.productivity,
          creativity: res.creativity,
          challenge: res.challenge,
          energy: res.energy,
          days_analysis: res.days_analysis,
          advice: res.advice,
        },
      });

      console.log("✅ Weekly work data created");
      return saved;
    }

    console.log("🟡 Weekly work data already exists");
    return latest;
  } catch (error) {
    console.error("❌ Get weekly work data error:", error);
  }
}

export async function getWeeklyPeopleData(id: string) {
  try {
    const parseId = parseInt(id);
    const user = await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
    if (!user) return null;

    const userId = user.id;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weeklyData = await client.weekly_people.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (weeklyData && isBefore(weeklyData.week_start, weekStart)) {
      await client.weekly_people.delete({ where: { user_id: user.id } });
      console.log("🗑️ Deleted old weekly_people data");
    }

    const latest = await client.weekly_people.findFirst({
      where: {
        user_id: userId,
        week_start: { gte: weekStart },
      },
    });

    if (!latest) {
      const data = {
        name: user.name,
        birth_date: user.birth_date?.toISOString(),
        birth_time: user.birth_time?.toISOString().slice(11, 16),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getWeeklyPeople(data);
      if (!res) return;

      const saved = await client.weekly_people.create({
        data: {
          user_id: userId,
          week_start: weekStart,
          week_end: weekEnd,
          total_score: res.total_score,
          summary: res.summary,
          love: res.love,
          friendship: res.friendship,
          family: res.family,
          work: res.work,
          days_analysis: res.days_analysis,
          advice: res.advice,
        },
      });

      console.log("✅ Weekly People data created");
      return saved;
    }

    console.log("🟡 Weekly People data already exists");
    return latest;
  } catch (error) {
    console.error("❌ Get weekly People data error:", error);
  }
}

export async function getWeeklyFinanceData(id: string) {
  try {
    const parseId = parseInt(id);
    const user = await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
    if (!user) return null;

    const userId = user.id;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weeklyData = await client.weekly_finance.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (weeklyData && isBefore(weeklyData.week_start, weekStart)) {
      await client.weekly_finance.delete({ where: { user_id: user.id } });
      console.log("🗑️ Deleted old weekly_finance data");
    }

    const latest = await client.weekly_finance.findFirst({
      where: {
        user_id: userId,
        week_start: { gte: weekStart },
      },
    });

    if (!latest) {
      const data = {
        name: user.name,
        birth_date: user.birth_date?.toISOString(),
        birth_time: user.birth_time?.toISOString().slice(11, 16),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getWeeklyFinance(data);
      if (!res) return;

      const saved = await client.weekly_finance.create({
        data: {
          user_id: userId,
          week_start: weekStart,
          week_end: weekEnd,
          total_score: res.total_score,
          summary: res.summary,
          income: res.income,
          expense: res.expense,
          invest: res.invest,
          days_analysis: res.days_analysis,
          advice: res.advice,
        },
      });

      console.log("✅ Weekly Finance data created");
      return saved;
    }

    console.log("🟡 Weekly Finance data already exists");
    return latest;
  } catch (error) {
    console.error("❌ Get weekly Finance data error:", error);
  }
}

export async function getWeeklyHealthData(id: string) {
  try {
    const parseId = parseInt(id);
    const user = await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
    if (!user) return null;

    const userId = user.id;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weeklyData = await client.weekly_health.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (weeklyData && isBefore(weeklyData.week_start, weekStart)) {
      await client.weekly_health.delete({ where: { user_id: user.id } });
      console.log("🗑️ Deleted old weekly_health data");
    }

    const latest = await client.weekly_health.findFirst({
      where: {
        user_id: userId,
        week_start: { gte: weekStart },
      },
    });

    if (!latest) {
      const data = {
        name: user.name,
        birth_date: user.birth_date?.toISOString(),
        birth_time: user.birth_time?.toISOString().slice(11, 16),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getWeeklyHealth(data);
      if (!res) return;

      const saved = await client.weekly_health.create({
        data: {
          user_id: userId,
          week_start: weekStart,
          week_end: weekEnd,
          total_score: res.total_score,
          summary: res.summary,
          state: res.state,
          activity: res.activity,
          warning: res.warning,
          days_analysis: res.days_analysis,
          advice: res.advice,
        },
      });

      console.log("✅ Weekly Health data created");
      return saved;
    }

    console.log("🟡 Weekly Health data already exists");
    return latest;
  } catch (error) {
    console.error("❌ Get weekly Health data error:", error);
  }
}

export async function getWeeklyMoodData(id: string) {
  try {
    const parseId = parseInt(id);
    const user = await client.user.findFirst({
      where: { id: parseId },
      omit: { password: true },
    });
    if (!user) return null;

    const userId = user.id;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weeklyData = await client.weekly_mood.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (weeklyData && isBefore(weeklyData.week_start, weekStart)) {
      await client.weekly_mood.delete({ where: { user_id: user.id } });
      console.log("🗑️ Deleted old weekly_mood data");
    }

    const latest = await client.weekly_mood.findFirst({
      where: {
        user_id: userId,
        week_start: { gte: weekStart },
      },
    });

    if (!latest) {
      const data = {
        name: user.name,
        birth_date: user.birth_date?.toISOString(),
        birth_time: user.birth_time?.toISOString().slice(11, 16),
        gender: user.gender,
        city: user.city_country,
        z_sign: user.z_sign,
      };

      const res = await getWeeklyMood(data);
      if (!res) return;

      const saved = await client.weekly_mood.create({
        data: {
          user_id: userId,
          week_start: weekStart,
          week_end: weekEnd,
          total_score: res.total_score,
          summary: res.summary,
          mood: res.mood,
          energy: res.energy,
          stress: res.stress,
          days_analysis: res.days_analysis,
          advice: res.advice,
        },
      });

      console.log("✅ Weekly Mood data created");
      return saved;
    }

    console.log("🟡 Weekly Mood data already exists");
    return latest;
  } catch (error) {
    console.error("❌ Get weekly Mood data error:", error);
  }
}

export async function editUser(id: number, formData: FormData) {
  const name = formData.get("name")?.toString();
  const birth_date = formData.get("dateOfBirth")?.toString();
  const birth_time = formData.get("time")?.toString();
  const gender = formData.get("gender")?.toString();
  const city_country = formData.get("city_country")?.toString();

  const userData = {
    name: name ? name : "",
    birth_date: birth_date ? birth_date : "",
    birth_time: birth_time ? birth_time : "",
    gender: gender ? gender : "",
    city_country: city_country ? city_country : "",
  };
  const z_sign = await getZodiac(userData);

  const user = await client.user.update({
    where: { id },
    data: {
      name,
      gender,
      city_country,
      birth_date: birth_date ? new Date(birth_date) : undefined,
      birth_time: birth_time ? new Date(`${birth_date}T${birth_time}Z`) : null,
      z_sign,
    },
  });

  const userId = user.id;

  try {
    const data = {
      name: user.name,
      birth_date: user?.birth_date?.toISOString(),
      birth_time: user?.birth_time?.toISOString().slice(11, 16),
      gender: user.gender,
      city: user.city_country,
      z_sign: user.z_sign,
    };

    const res = await getZodiacData(data);
    if (!res) return;

    (["number", "total_score"] as const).forEach((key) => {
      if (typeof res.today[key] !== "number") {
        throw new Error(`Invalid data: today.${key} is not a number`);
      }
    });

    (["income", "expense", "invest"] as const).forEach((key) => {
      if (typeof res.finance[key] !== "number") {
        throw new Error(`Invalid data: finance.${key} is not a number`);
      }
    });

    await client.$transaction([
      client.today.upsert({
        where: { user_id: userId },
        update: { ...res.today, updated_at: new Date() },
        create: { user_id: userId, ...res.today },
      }),
      client.todays_finance.upsert({
        where: { user_id: userId },
        update: { ...res.finance, updated_at: new Date() },
        create: { user_id: userId, ...res.finance },
      }),
      client.todays_health.upsert({
        where: { user_id: userId },
        update: { ...res.health, updated_at: new Date() },
        create: { user_id: userId, ...res.health },
      }),
      client.todays_work.upsert({
        where: { user_id: userId },
        update: { ...res.work, updated_at: new Date() },
        create: { user_id: userId, ...res.work },
      }),
      client.todays_relationship.upsert({
        where: { user_id: userId },
        update: { ...res.relationship, updated_at: new Date() },
        create: { user_id: userId, ...res.relationship },
      }),
      client.todays_mood.upsert({
        where: { user_id: userId },
        update: { ...res.mood, updated_at: new Date() },
        create: { user_id: userId, ...res.mood },
      }),
    ]);

    console.log("✅ All zodiac-related data upserted successfully.");
    revalidatePath(`/profile/${id}`);
    redirect(`/profile/${id}`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("💥 Prisma error:", error.code, error.message);
    } else {
      console.error("❌ Get zodiac info error:", error);
    }
  }
}

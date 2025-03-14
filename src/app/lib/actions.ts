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
    // 이메일 중복 체크
    const existingUser = await client.user.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    const hashedPassword = await argon2.hash(userData.password);

    // 유저 생성
    const newUser = await client.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        birthDate: userData.birth_date ? new Date(userData.birth_date) : null,
        birthTime: userData.birth_time
          ? new Date(`1970-01-01T${userData.birth_time}Z`)
          : null,
        gender: userData.gender,
        cityCountry: userData.city_country,
        zSign: userData.z_sign,
      },
    });

    const newUserId = newUser.id;

    return { success: true, userId: newUserId };
  } catch (error) {
    console.error("❌ 회원가입 오류:", error);
    return { success: false, message: "error occured! something went wrong." };
  }
}

// // 이메일로 유저 찾기 (로그인 시 사용 가능)
// export async function getUserByEmail(email: string) {
//   try {
//     const user = await db("users").where({ email }).first();
//     return user || null;
//   } catch (error) {
//     console.error("❌ 유저 검색 오류:", error);
//     return null;
//   }
// }

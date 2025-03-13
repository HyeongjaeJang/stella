import db from "@/app/lib/db";

// 회원가입 함수
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
    const existingUser = await db("users").where({ email: userData.email }).first();
    if (existingUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    // 유저 생성
    const [newUserId] = await db("users").insert({
      ...userData,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });

    return { success: true, userId: newUserId };
  } catch (error) {
    console.error("❌ 회원가입 오류:", error);
    return { success: false, message: (error as Error).message };
}
}

// 이메일로 유저 찾기 (로그인 시 사용 가능)
export async function getUserByEmail(email: string) {
  try {
    const user = await db("users").where({ email }).first();
    return user || null;
  } catch (error) {
    console.error("❌ 유저 검색 오류:", error);
    return null;
  }
}

import {
  getZodiacInfo,
  getUser,
  getToday,
  getTodayWork,
  getTodayPeople,
  getTodayFinance,
  getTodayHealth,
  getTodayMood,
  getUserInfo,
} from "@/app/lib/actions";
import HomeClient from "@/app/home/homeClient";

export default async function Page() {
  const res = await getUser();

  if (!res?.user) {
    console.error("❌ User not found");
    return;
  }

  await getZodiacInfo(res.user.email);

  const today = await getToday(res.user.email);
  const work = await getTodayWork(res.user.email);
  const people = await getTodayPeople(res.user.email);
  const finance = await getTodayFinance(res.user.email);
  const health = await getTodayHealth(res.user.email);
  const mood = await getTodayMood(res.user.email);
  const info = await getUserInfo(res.user.id);

  return (
    <HomeClient
      user={res.user}
      info={info!}
      today={today!}
      work={work!}
      people={people!}
      finance={finance!}
      health={health!}
      mood={mood!}
    />
  );
}

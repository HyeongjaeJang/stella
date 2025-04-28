import {
  getUser,
  getToday,
  getTodayWork,
  getTodayPeople,
  getTodayFinance,
  getTodayHealth,
  getTodayMood,
} from "@/app/lib/actions";
import HomeClient from "@/app/home/homeClient";

export default async function Page() {
  const res = await getUser();

  if (!res?.user) {
    console.error("❌ User not found");
    return;
  }

  const today = await getToday(res.user.email);
  const work = await getTodayWork(res.user.email);
  const people = await getTodayPeople(res.user.email);
  const finance = await getTodayFinance(res.user.email);
  const health = await getTodayHealth(res.user.email);
  const mood = await getTodayMood(res.user.email);

  return (
    <HomeClient
      user={res.user}
      today={today!}
      work={work!}
      people={people!}
      finance={finance!}
      health={health!}
      mood={mood!}
    />
  );
}

import { getWeeklyPeopleData, getUser, getUserInfo } from "@/app/lib/actions";
import WeeklyPeopleClient from "./weeklyPeopleClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const res = await getUser();
  if (!res?.user) {
    console.error("❌ User not found");
    return;
  }

  const weeklyPeople = await getWeeklyPeopleData(id);
  if (!weeklyPeople) {
    console.error("❌ Weekly people data not found");
    return <div>Weekly people data not found</div>;
  }
  const fixedWeeklyPeople = {
    ...weeklyPeople,
    advice: weeklyPeople?.advice ?? "",
    summary: weeklyPeople?.summary ?? "",
    days_analysis: (weeklyPeople?.days_analysis ?? {}) as Record<
      string,
      string
    >,
    week_start: weeklyPeople?.week_start ?? new Date(),
    week_end: weeklyPeople?.week_end ?? new Date(),
  };

  const info = await getUserInfo(id);

  if (!info) return <div>Not found</div>;

  return <WeeklyPeopleClient user={info} weeklyPeople={fixedWeeklyPeople} />;
};

export default Page;

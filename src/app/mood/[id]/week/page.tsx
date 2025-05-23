import { getWeeklyMoodData, getUser, getUserInfo } from "@/app/lib/actions";
import WeeklyMoodClient from "./weeklyMoodClient";

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

  const weeklyMood = await getWeeklyMoodData(id);
  if (!weeklyMood) {
    console.error("❌ Weekly mood data not found");
    return <div>Weekly mood data not found</div>;
  }
  const fixedWeeklyMood = {
    ...weeklyMood,
    advice: weeklyMood?.advice ?? "",
    summary: weeklyMood?.summary ?? "",
    days_analysis: (weeklyMood?.days_analysis ?? {}) as Record<string, string>,
    week_start: weeklyMood?.week_start ?? new Date(),
    week_end: weeklyMood?.week_end ?? new Date(),
  };

  const info = await getUserInfo(id);

  if (!info) return <div>Not found</div>;

  return <WeeklyMoodClient user={info} weeklyMood={fixedWeeklyMood} />;
};

export default Page;

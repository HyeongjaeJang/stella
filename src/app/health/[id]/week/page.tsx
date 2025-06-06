import { getWeeklyHealthData, getUser, getUserInfo } from "@/app/lib/actions";
import WeeklyHealthClient from "./weeklyHealthClient";

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

  const weeklyHealth = await getWeeklyHealthData(id);
  if (!weeklyHealth) {
    console.error("❌ Weekly health data not found");
    return <div>Weekly health data not found</div>;
  }
  const fixedWeeklyHealth = {
    ...weeklyHealth,
    advice: weeklyHealth?.advice ?? "",
    summary: weeklyHealth?.summary ?? "",
    days_analysis: (weeklyHealth?.days_analysis ?? {}) as Record<
      string,
      string
    >,
    week_start: weeklyHealth?.week_start ?? new Date(),
    week_end: weeklyHealth?.week_end ?? new Date(),
  };

  const info = await getUserInfo(id);

  if (!info) return <div>Not found</div>;

  return <WeeklyHealthClient user={info} weeklyHealth={fixedWeeklyHealth} />;
};

export default Page;

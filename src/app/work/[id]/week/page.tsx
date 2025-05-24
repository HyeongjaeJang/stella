import { getWeeklyWorkData, getUser, getUserInfo } from "@/app/lib/actions";
import WeeklyWorkClient from "./weeklyWorkClient";

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

  const weeklyWork = await getWeeklyWorkData(id);
  if (!weeklyWork) {
    console.error("❌ Weekly work data not found");
    return <div>Weekly work data not found</div>;
  }
  const fixedWeeklyWork = {
    ...weeklyWork,
    advice: weeklyWork?.advice ?? "",
    summary: weeklyWork?.summary ?? "",
    days_analysis: (weeklyWork?.days_analysis ?? {}) as Record<string, string>,
    week_start: weeklyWork?.week_start ?? new Date(),
    week_end: weeklyWork?.week_end ?? new Date(),
  };

  const info = await getUserInfo(id);

  if (!info) return <div>Not found</div>;

  return <WeeklyWorkClient user={info} weeklyWork={fixedWeeklyWork} />;
};

export default Page;

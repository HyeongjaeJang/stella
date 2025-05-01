import { getWeeklyFinanceData, getUser } from "@/app/lib/actions";
import WeeklyFinanceClient from "./weeklyFinanceClient";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const res = await getUser();
  if (!res?.user) {
    console.error("❌ User not found");
    return;
  }

  const weeklyFinance = await getWeeklyFinanceData(id);
  if (!weeklyFinance) {
    console.error("❌ Weekly finance data not found");
    return <div>Weekly finance data not found</div>;
  }
  const fixedWeeklyFinance = {
    ...weeklyFinance,
    advice: weeklyFinance?.advice ?? "",
    summary: weeklyFinance?.summary ?? "",
    days_analysis: (weeklyFinance?.days_analysis ?? {}) as Record<
      string,
      string
    >,
    week_start: weeklyFinance?.week_start ?? new Date(),
    week_end: weeklyFinance?.week_end ?? new Date(),
  };

  return (
    <WeeklyFinanceClient user={res?.user} weeklyFinance={fixedWeeklyFinance} />
  );
};

export default Page;

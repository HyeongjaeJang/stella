"use client";

import Header from "@/app/ui/home/header";
import FinanceFortune from "@/app/ui/week/financeFortune";
import Days from "@/app/ui/week/days";
import { Suspense } from "react";
import { PropsUser } from "@/types/types";

type WeeklyFinance = {
  advice: string;
  income?: number;
  expense?: number;
  days_analysis: Record<string, string>;
  invest?: number;
  id?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const WeeklyFinanceClient = ({
  user,
  weeklyFinance,
}: {
  user: PropsUser;
  weeklyFinance: WeeklyFinance;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user && (
        <div className="flex flex-col h-screen">
          <Header user={user} />
          <div className="flex flex-col p-4">
            <h2 className="text-2xl font-extralight mb-4">
              {"This week's finance fortune"}
            </h2>
            <div className="flex justify-between bg-gray-200 dark:bg-white/10 p-5 rounded-lg items-center">
              <div className="bg-[#8ea8ff]/50 p-4 border-2 border-[#8ea8ff]/100 rounded-xxl flex justify-center items-center">
                <p className="text-3xl text-white">
                  {weeklyFinance?.total_score}
                </p>
              </div>
              <div className="flex flex-col justify-center items-start text-xs w-56">
                <p className="mb-2 font-semibold">
                  Summary about finance fortune
                </p>
                <li>Weekly Score: {weeklyFinance?.total_score}/100</li>
                <li>Weekly Advice: {weeklyFinance?.advice}</li>
              </div>
            </div>
            <FinanceFortune weeklyFinance={weeklyFinance} />
            <div className="mt-8 flex flex-col gap-3">
              <h3 className="text-lg font-thin">Weekly Summary</h3>
              <p className="text-sm font-thin">{weeklyFinance?.summary}</p>
            </div>
            <Days days={weeklyFinance?.days_analysis} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default WeeklyFinanceClient;

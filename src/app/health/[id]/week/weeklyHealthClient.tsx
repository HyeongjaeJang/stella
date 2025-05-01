"use client";

import Header from "@/app/ui/home/header";
import HealthFourtune from "@/app/ui/week/healthFourtune";
import Days from "@/app/ui/week/days";
import { Suspense } from "react";
import { PropsUser } from "@/types/types";

type WeeklyHealth = {
  advice: string;
  state?: number;
  activity?: number;
  days_analysis: Record<string, string>;
  warning?: number;
  id?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const WeeklyHealthClient = ({
  user,
  weeklyHealth,
}: {
  user: PropsUser;
  weeklyHealth: WeeklyHealth;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user && (
        <div className="flex flex-col h-screen">
          <Header name={user?.name} />
          <div className="flex flex-col p-4">
            <h2 className="text-2xl font-extralight mb-4">
              {"This week's health fortune"}
            </h2>
            <div className="flex justify-between bg-gray-200 dark:bg-white/10 p-5 rounded-lg items-center">
              <div className="bg-[#8ea8ff]/50 p-4 border-2 border-[#8ea8ff]/100 rounded-xxl flex justify-center items-center">
                <p className="text-3xl text-white">
                  {weeklyHealth?.total_score}
                </p>
              </div>
              <div className="flex flex-col justify-center items-start text-xs w-56">
                <p className="mb-2 font-semibold">
                  Summary about health fortune
                </p>
                <li>Weekly Score: {weeklyHealth?.total_score}/100</li>
                <li>Weekly Advice: {weeklyHealth?.advice}</li>
              </div>
            </div>
            <HealthFourtune weeklyHealth={weeklyHealth} />
            <div className="mt-8 flex flex-col gap-3">
              <h3 className="text-lg font-thin">Weekly Summary</h3>
              <p className="text-sm font-thin">{weeklyHealth?.summary}</p>
            </div>
            <Days days={weeklyHealth?.days_analysis} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default WeeklyHealthClient;

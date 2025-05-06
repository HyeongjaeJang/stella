"use client";

import Header from "@/app/ui/home/header";
import Days from "@/app/ui/week/days";
import { Suspense } from "react";
import { Info } from "@/types/types";
import Fortune from "@/app/ui/week/fortune";

type WeeklyWork = {
  advice: string;
  challenge?: number;
  creativity?: number;
  days_analysis: Record<string, string>;
  energy?: number;
  id?: number;
  productivity?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const WeeklyWorkClient = ({
  user,
  weeklyWork,
}: {
  user: Info;
  weeklyWork: WeeklyWork;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user && (
        <div className="flex flex-col h-screen">
          <Header
            user={{
              id: user.id.toString(),
              name: user.name,
              z_sign: user.z_sign,
              email: user.email,
            }}
          />
          <div className="flex flex-col p-4">
            <h2 className="text-2xl font-extralight mb-4">
              {"This week's work fortune"}
            </h2>
            <div className="flex justify-between bg-gray-200 dark:bg-white/10 p-5 rounded-lg items-center">
              <div className="bg-[#8ea8ff]/50 p-4 border-2 border-[#8ea8ff]/100 rounded-xxl flex justify-center items-center">
                <p className="text-3xl text-white">{weeklyWork?.total_score}</p>
              </div>
              <div className="flex flex-col justify-center items-start text-xs w-56">
                <p className="mb-2 font-semibold">Summary about work fortune</p>
                <li>Weekly Score: {weeklyWork?.total_score}/100</li>
                <li>Weekly Advice: {weeklyWork?.advice}</li>
              </div>
            </div>
            <Fortune weeklyWork={weeklyWork} />
            <div className="mt-8 flex flex-col gap-3">
              <h3 className="text-lg font-thin">Weekly Summary</h3>
              <p className="text-sm font-thin">{weeklyWork?.summary}</p>
            </div>
            <Days days={weeklyWork?.days_analysis} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default WeeklyWorkClient;

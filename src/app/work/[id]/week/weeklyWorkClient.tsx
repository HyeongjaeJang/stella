"use client";

import Header from "@/app/ui/home/header";
import Days from "@/app/ui/week/days";
import { Suspense } from "react";
import { PropsUser } from "@/types/types";

type WeeklyWork = {
  advice: string;
  challenge?: number | undefined;
  creativity?: number | undefined;
  days_analysis: Record<string, string>;
  energy?: number | undefined;
  id?: number | undefined;
  productivity?: number | undefined;
  summary: string;
  total_score?: number | undefined;
  user_id?: number | undefined;
  week_end: Date;
  week_start: Date;
};

const WeeklyWorkClient = ({
  user,
  weeklyWork,
}: {
  user: PropsUser;
  weeklyWork: WeeklyWork;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user && (
        <div className="flex flex-col h-screen">
          <Header name={user?.name} />
          <div className="flex flex-col p-4">
            <div className="flex flex-col mt-5 bg-button w-full justify-center items-center p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-white">Weekly Work</h2>
              <p className="text-xl text-white my-4">
                Total Score: <strong>{weeklyWork?.total_score}</strong>
              </p>
              <hr className="border-gray-200 border-[1px] w-full" />
              <div className="flex flex-wrap gap-2 p-4 text-white">
                <div className="w-44">
                  <p>
                    Creativity: <strong>{weeklyWork?.creativity}</strong>
                  </p>
                </div>
                <div>
                  <p>
                    Productivity: <strong>{weeklyWork?.productivity}</strong>
                  </p>
                </div>
                <div className="w-44">
                  <p>
                    Energy: <strong>{weeklyWork?.energy}</strong>
                  </p>
                </div>
                <div>
                  <p>
                    Challenge: <strong>{weeklyWork?.challenge}</strong>
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-button border-[1px] w-full mt-8" />
            <Days days={weeklyWork?.days_analysis} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default WeeklyWorkClient;

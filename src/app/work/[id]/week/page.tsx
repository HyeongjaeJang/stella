"use client";

import React, { useState, useEffect, Suspense } from "react";
import { getWeeklyWorkData, getUser } from "@/app/lib/actions";
import { useParams } from "next/navigation";
import Header from "@/app/ui/home/header";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  z_sign: string | null;
};

type WeeklyWork = {
  advice: string;
  challenge: number;
  creativity: number;
  days_analysis: Record<string, string>;
  energy: number;
  id: number;
  productivity: number;
  summary: string | null;
  total_score: number;
  user_id: number;
  week_end: Date;
  week_start: Date;
};

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const [weeklyWork, setWeeklyWork] = useState<WeeklyWork | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res?.user) {
        setUser(res.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWeeklyWorkData = async () => {
      if (id) {
        const week = await getWeeklyWorkData(id);
        if (week) {
          const fixed = {
            ...week,
            days_analysis: (week.days_analysis ?? {}) as Record<string, string>,
          };
          setWeeklyWork(fixed);
        }
      }
    };
    fetchWeeklyWorkData();
  }, [id]);

  return (
    <Suspense fallback>
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
            <div>
              <p className="text-xl font-bold my-4 text-button">
                Days Analysis
              </p>
              {weeklyWork?.days_analysis && (
                <div className="my-4 space-y-2">
                  {Object.entries(weeklyWork.days_analysis)
                    .sort(([dayA], [dayB]) => {
                      const dayOrder = [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                      ];
                      return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
                    })
                    .map(([day, text]) => (
                      <div
                        key={day}
                        className="p-2 bg-gray-500 rounded-md text-white flex justify-between items-center"
                      >
                        <p className="font-bold">{day}</p>
                        <p className="text-sm">{text}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;

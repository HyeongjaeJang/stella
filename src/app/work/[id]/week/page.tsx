"use client";

import React, { useState, useEffect, Suspense } from "react";
import { getWeeklyWorkData, getUser } from "@/app/lib/actions";
import { useParams } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";
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
  days_analysis: JsonValue;
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
          setWeeklyWork(week);
        }
      }
    };
    fetchWeeklyWorkData();
  }, [id]);

  return (
    <Suspense fallback>
      {user && (
        <div className="flex flex-col min-h-screen">
          <Header name={user?.name} />
          <div className="flex flex-col justify-center items-center p-4">
            <div className="flex flex-col mt-5 bg-button w-full justify-center items-center p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-white">Weekly Work</h2>
              <p className="text-xl text-white my-4">
                Total Score: <strong>{weeklyWork?.total_score}</strong>
              </p>
              <hr className="border-gray-200 border-[1px] w-full" />
              <div className="flex flex-wrap gap-2 p-4">
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
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Page;

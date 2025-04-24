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

  return <Suspense fallback>{user && <Header name={user?.name} />}</Suspense>;
};

export default Page;

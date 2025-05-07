"use client";

import Header from "@/app/ui/home/header";
import Buttons from "@/app/ui/home/buttons";
import Cards from "@/app/ui/home/cards";
import { Suspense } from "react";
import { Today, Work, People, Finance, Health, Mood } from "@/types/cardTypes";
import { PropsUser, Info } from "@/types/types";
import Link from "next/link";

export default function HomeClient({
  user,
  today,
  work,
  people,
  finance,
  health,
  mood,
  info,
}: {
  user: PropsUser;
  today: Today;
  work: Work;
  people: People;
  finance: Finance;
  health: Health;
  mood: Mood;
  info: Info;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col h-screen">
        <Header
          user={{
            id: info.id.toString(),
            name: info.name,
            z_sign: info.z_sign,
            email: info.email,
          }}
        />
        <div className="p-5">
          <p className="text-xl font-thin">
            {`Hi ${info.name}, how's your day?`}
          </p>
        </div>
        <Buttons user={user} />
        <Cards
          user={user}
          today={today}
          work={work}
          people={people}
          finance={finance}
          health={health}
          mood={mood}
        />
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400 italic">
            ✨ Curious about your compatibility?
          </p>
          <Link
            href={`/compatibility/${user.id}`}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md transition-transform hover:scale-105 border-2 border-button"
          >
            Check Compatibility
          </Link>
        </div>
      </div>
    </Suspense>
  );
}

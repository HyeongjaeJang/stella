"use client";

import Header from "@/app/ui/home/header";
import Buttons from "@/app/ui/home/buttons";
import Cards from "@/app/ui/home/cards";
import { Suspense } from "react";
import { Today, Work, People, Finance, Health, Mood } from "@/types/cardTypes";
import { PropsUser, Info } from "@/types/types";

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
          <p className="text-xl font-thin text-black dark:text-white">
            {`Hi ${user.name}, how's your day?`}
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
      </div>
    </Suspense>
  );
}

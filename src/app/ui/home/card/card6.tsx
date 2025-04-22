import React, { useState, useEffect } from "react";
import { getTodayMood } from "@/app/lib/actions";

type Info = {
  email: string;
};

type Mood = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  mood: string | null;
  energy: string | null;
  stress: string | null;
  text: string | null;
};

const Card6 = ({ email }: Info) => {
  const [mood, setMood] = useState<Mood | null>(null);
  useEffect(() => {
    const fetchTodayMood = async () => {
      const mood = await getTodayMood(email);
      if (mood) {
        setMood(mood);
      }
    };
    fetchTodayMood();
  }, []);

  return (
    <div className="p-4">
      {mood && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-2xl font-semibold">Feel & Flow</h2>
          <h3>{"Here's a check-in on your emotional energy today"}</h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="flex text-sm gap-2">
              <p>Mood:</p>
              <p className="font-semibold">{mood?.mood}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Energy:</p>
              <p className="font-semibold">{mood?.energy}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Stress:</p>
              <p className="font-semibold">{mood?.stress}</p>
            </div>
            <div className="flex text-sm gap-2 p-1">
              <p>{mood?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card6;

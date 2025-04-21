import React, { useState, useEffect } from "react";
import { getTodayHealth } from "@/app/lib/actions";

type Info = {
  email: string;
};

type Health = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  state: string | null;
  activity: string | null;
  warning: string | null;
  text: string | null;
};

const Card5 = ({ email }: Info) => {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    const fetchTodayHealth = async () => {
      const health = await getTodayHealth(email);
      if (health) {
        setHealth(health);
      }
    };
    fetchTodayHealth();
  }, []);

  return (
    <div className="p-4">
      {health && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-2xl font-semibold">Health & Wellness</h2>
          <h3>{"Here's what to keep in mind for your body and mind today"}</h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="flex text-sm gap-2">
              <p>State:</p>
              <p className="font-semibold">{health?.state}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Activity:</p>
              <p className="font-semibold">{health?.activity}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Warning:</p>
              <p className="font-semibold">{health?.warning}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>{health?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card5;

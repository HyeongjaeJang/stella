import React, { useEffect, useState } from "react";
import { getTodayWork } from "@/app/lib/actions";

type Info = {
  email: string;
};

type Work = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  text: string | null;
  productivity: string | null;
  creativity: string | null;
  challenge: string | null;
};

const Card2 = ({ email }: Info) => {
  const [work, setWork] = useState<Work | null>(null);
  useEffect(() => {
    const fetchTodayWork = async () => {
      const work = await getTodayWork(email);
      if (work) {
        setWork(work);
      }
    };
    fetchTodayWork();
  }, []);

  return (
    <div className="p-4">
      {work && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-2xl font-semibold">Career & Work</h2>
          <h3>{"Here's what to keep in mind for work today"}</h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="flex text-sm gap-2">
              <p>Productivity:</p>
              <p className="font-semibold">{work?.productivity}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Creativity:</p>
              <p className="font-semibold">{work?.creativity}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Challenge:</p>
              <p className="font-semibold">{work?.challenge}</p>
            </div>
            <div className="flex text-sm gap-2 p-1">
              <p>{work?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card2;

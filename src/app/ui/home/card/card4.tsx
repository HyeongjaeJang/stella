import React, { useState, useEffect } from "react";
import { getTodayFinance } from "@/app/lib/actions";

type Info = {
  email: string;
};

type Finance = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  income: number | null;
  expense: number | null;
  invest: number | null;
  text: string | null;
};

const Card4 = ({ email }: Info) => {
  const [finance, setFinance] = useState<Finance | null>(null);

  useEffect(() => {
    const fetchTodayFinance = async () => {
      const finance = await getTodayFinance(email);
      if (finance) {
        setFinance(finance);
      }
    };
    fetchTodayFinance();
  }, []);

  return (
    <div className="p-4">
      {finance && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-2xl font-semibold">Money & Wealth</h2>
          <h3>{"Here's what to keep in mind for your finances today"}</h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="flex text-sm gap-2">
              <p>Income:</p>
              <p className="font-semibold">{finance?.income}/10</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Expense:</p>
              <p className="font-semibold">{finance?.expense}/10</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Invest:</p>
              <p className="font-semibold">{finance?.invest}/10</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>{finance?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card4;

import React from "react";

type WeeklyFinance = {
  advice: string;
  income?: number;
  expense?: number;
  days_analysis: Record<string, string>;
  invest?: number;
  id?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const FinanceFortune = ({
  weeklyFinance,
}: {
  weeklyFinance: WeeklyFinance;
}) => {
  const getBgColor = (score: number | undefined) => {
    if (score === undefined) return "bg-gray-200";
    if (score >= 7) return "bg-[#7CB342]/50 border-2 border-[#7CB342]";
    if (score >= 4) return "bg-[#FFCC32]/50 border-2 border-[#FFCC32]";
    return "bg-[#F44336]/50 border-2 border-[#F44336]";
  };

  return (
    <div className="mt-7 flex flex-wrap gap-9">
      <div className="flex justify-center items-center gap-2 mr-12">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyFinance?.income)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyFinance?.income}
        </div>
        <p className="text-sm font-semibold">Income</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyFinance?.expense)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyFinance?.expense}
        </div>
        <p className="text-sm font-semibold">Expense</p>
      </div>
      <div className="flex justify-center items-center gap-2 mr-3">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyFinance?.invest)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyFinance?.invest}
        </div>
        <p className="text-sm font-semibold">Invest</p>
      </div>
    </div>
  );
};

export default FinanceFortune;

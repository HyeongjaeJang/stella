import React from "react";

type WeeklyPeople = {
  advice: string;
  love?: number;
  family?: number;
  days_analysis: Record<string, string>;
  friendship?: number;
  id?: number;
  work?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const PeopleFortune = ({ weeklyPeople }: { weeklyPeople: WeeklyPeople }) => {
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
          className={`flex justify-center items-center text-white ${getBgColor(weeklyPeople?.love)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyPeople?.love}
        </div>
        <p className="text-sm font-semibold">Love</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyPeople?.family)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyPeople?.family}
        </div>
        <p className="text-sm font-semibold">Family</p>
      </div>
      <div className="flex justify-center items-center gap-2 mr-3">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyPeople?.friendship)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyPeople?.friendship}
        </div>
        <p className="text-sm font-semibold">Challenge</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyPeople?.work)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyPeople?.work}
        </div>
        <p className="text-sm font-semibold">Work</p>
      </div>
    </div>
  );
};

export default PeopleFortune;

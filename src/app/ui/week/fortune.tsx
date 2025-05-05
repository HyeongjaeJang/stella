import React from "react";

type WeeklyWork = {
  advice: string;
  challenge?: number | undefined;
  creativity?: number | undefined;
  days_analysis: Record<string, string>;
  energy?: number | undefined;
  id?: number | undefined;
  productivity?: number | undefined;
  summary: string;
  total_score?: number | undefined;
  user_id?: number | undefined;
  week_end: Date;
  week_start: Date;
};

const Fortune = ({ weeklyWork }: { weeklyWork: WeeklyWork }) => {
  const getBgColor = (score: number | undefined) => {
    if (score === undefined) return "bg-gray-200";
    if (score >= 7) return "bg-[#7CB342]/50 border-2 border-[#7CB342]";
    if (score >= 4) return "bg-[#FFCC32]/50 border-2 border-[#FFCC32]";
    return "bg-[#F44336]/50 border-2 border-[#F44336]";
  };

  return (
    <div className="mt-7 flex flex-wrap gap-9">
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyWork?.productivity)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyWork?.productivity}
        </div>
        <p className="text-sm font-semibold">Productivity</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyWork?.creativity)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyWork?.creativity}
        </div>
        <p className="text-sm font-semibold">Creativity</p>
      </div>
      <div className="flex justify-center items-center gap-2 mr-3">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyWork?.challenge)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyWork?.challenge}
        </div>
        <p className="text-sm font-semibold">Challenge</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyWork?.energy)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyWork?.energy}
        </div>
        <p className="text-sm font-semibold">Energy</p>
      </div>
    </div>
  );
};

export default Fortune;

import React from "react";

type WeeklyMood = {
  advice: string;
  mood?: number;
  energy?: number;
  days_analysis: Record<string, string>;
  stress?: number;
  id?: number;
  summary: string;
  total_score?: number;
  user_id?: number;
  week_end: Date;
  week_start: Date;
};

const MoodFourtune = ({ weeklyMood }: { weeklyMood: WeeklyMood }) => {
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
          className={`flex justify-center items-center text-white ${getBgColor(weeklyMood?.mood)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyMood?.mood}
        </div>
        <p className="text-sm font-semibold">Mood</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyMood?.energy)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyMood?.energy}
        </div>
        <p className="text-sm font-semibold">Energy</p>
      </div>
      <div className="flex justify-center items-center gap-2 mr-3">
        <div
          className={`flex justify-center items-center text-white ${getBgColor(weeklyMood?.stress)} w-fit p-4 px-6 rounded-lg text-xl font-bold`}
        >
          {weeklyMood?.stress}
        </div>
        <p className="text-sm font-semibold">Stress</p>
      </div>
    </div>
  );
};

export default MoodFourtune;

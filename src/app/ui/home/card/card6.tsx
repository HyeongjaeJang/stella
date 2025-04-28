import { Mood } from "@/types/cardTypes";

const Card6 = ({ mood }: { mood: Mood }) => {
  if (!mood) {
    return null;
  }

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

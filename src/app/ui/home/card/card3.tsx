import { People } from "@/types/cardTypes";

const Card3 = ({ people }: { people: People }) => {
  if (!people) {
    return null;
  }

  return (
    <div className="p-4">
      {people && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-2xl font-semibold">Love & People</h2>
          <h3>{"Here's your social insight for the day"}</h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <div className="flex text-sm gap-2">
              <p>Love:</p>
              <p className="font-semibold">{people?.love}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Friend:</p>
              <p className="font-semibold">{people?.friend}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Family:</p>
              <p className="font-semibold">{people?.family}</p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Work:</p>
              <p className="font-semibold">{people?.work}</p>
            </div>
            <div className="flex text-sm gap-2 p-1">
              <p>{people?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card3;

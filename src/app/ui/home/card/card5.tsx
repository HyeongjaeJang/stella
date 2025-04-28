import { Health } from "@/types/cardTypes";

const Card5 = ({ health }: { health: Health }) => {
  if (!health) {
    return null;
  }

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
            <div className="flex text-sm gap-2 p-2">
              <p>{health?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card5;

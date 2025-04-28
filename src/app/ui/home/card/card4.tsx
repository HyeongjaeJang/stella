import { Finance } from "@/types/cardTypes";

const Card4 = ({ finance }: { finance: Finance }) => {
  if (!finance) {
    return null;
  }

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
            <div className="flex text-sm gap-2 p-1">
              <p>{finance?.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card4;

import { Work } from "@/types/cardTypes";

const Card2 = ({ work }: { work: Work }) => {
  if (!work) {
    return null;
  }

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
            <div className="flex justify-center items-center text-sm gap-2 px-2">
              <p>Challenge:</p>
              <p className="font-semibold w-fit">{work?.challenge}</p>
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

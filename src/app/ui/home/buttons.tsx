import React from "react";
import Image from "next/image";

const images = [
  "/work.png",
  "/people.png",
  "/finance.png",
  "/health2.png",
  "/mood.png",
];
const buttons = ["Work", "People", "Finance", "Health", "Mood"];

const Buttons = () => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-between overflow-auto gap-4 w-full">
        {buttons.map((button, i) => (
          <div
            key={button}
            className="flex flex-col justify-center items-center bg-blue-300 rounded-lg w-[4.2rem] p-1 px-3 flex-shrink-0 dark:bg-inherit"
          >
            <Image src={images[i]} alt={button} width={200} height={200} />
            <p className="text-white text-[1rem] font-bold text-center">
              {button}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buttons;

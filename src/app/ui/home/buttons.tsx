import React from "react";
import Image from "next/image";

const images = [
  "/work.png",
  "/health.png",
  "/mood.png",
  "/health.png",
  "/mood.png",
];
const buttons = ["Work", "People", "Finance", "Health", "Mood"];

const Buttons = () => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-between overflow-auto gap-4">
        {buttons.map((button, i) => (
          <div key={button} className="flex flex-col justify-center">
            <Image src={images[i]} alt={button} width={200} height={200} />
            <p className="text-button text-[1rem] font-bold text-center">
              {button}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buttons;

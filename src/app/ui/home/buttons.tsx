import React from "react";

const buttons = ["Work", "People", "Finance", "Health", "Mood"];

const Buttons = () => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-around overflow-auto gap-2">
        {buttons.map((button) => (
          <div
            key={button}
            className="px-7 py-5 rounded-md bg-white shadow-neutral-500 shadow-inner"
          >
            <p className="text-button text-[1rem] font-bold">{button}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buttons;

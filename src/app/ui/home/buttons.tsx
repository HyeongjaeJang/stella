import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PropsUser } from "@/types/types";

const images = [
  "/work.png",
  "/people.png",
  "/finance.png",
  "/health2.png",
  "/mood.png",
];
const buttons = ["Work", "People", "Finance", "Health", "Mood"];

const Buttons = ({ user }: { user: PropsUser }) => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-between overflow-auto gap-4 w-full">
        {buttons.map((button, i) => (
          <Link key={button} href={`/${button.toLowerCase()}/${user.id}/week`}>
            <button className="flex flex-col justify-center items-center bg-blue-300 rounded-lg w-[4.2rem] p-1 px-3 flex-shrink-0 dark:bg-inherit">
              <Image src={images[i]} alt={button} width={200} height={200} />
              <p className="text-white text-[1rem] font-bold text-center">
                {button}
              </p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Buttons;

import React from "react";
import Image from "next/image";
import { Today } from "@/types/cardTypes";

const Card1 = ({ z_sign, today }: { z_sign: string | null; today: Today }) => {
  if (!today) {
    return null;
  }

  return (
    <div>
      {today && (
        <div className="flex flex-col justify-center items-center">
          <Image
            src={`/${z_sign?.toLowerCase()}.png`}
            alt="coll"
            width={150}
            height={150}
            className="mt-5"
            priority
          />
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-center items-center gap-2">
              <div>Score:</div>
              <div className="text-3xl text-white font-bold">
                {today.total_score}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div>Color:</div>
              <div className="font-bold">{today.color}</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <div className="flex gap-2">
                <div>Number:</div>
                <div className="font-bold">{today.number}</div>
              </div>
              <div className="flex gap-2">
                <div>Item:</div>
                <div className="font-bold">{today.item}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card1;

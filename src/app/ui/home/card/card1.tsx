import React from "react";
import Image from "next/image";

type Info = {
  z_sign: string | null;
  email: string;
};

const Card1 = ({ z_sign, email }: Info) => {
  return (
    <div>
      <Image
        src={`/${z_sign?.toLowerCase()}.png`}
        alt="coll"
        width={200}
        height={150}
      />
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex justify-center items-center gap-2">
          <div>Score:</div>
          <div className="text-3xl text-white font-bold">63</div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="bg-red-700 p-3 rounded-3xl" />
          <div>Red</div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div>Number:</div>
          <div>18</div>
        </div>
      </div>
    </div>
  );
};

export default Card1;

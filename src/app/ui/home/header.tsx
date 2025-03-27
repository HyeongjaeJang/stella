import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between w-full p-2">
      <Image src="/Stella.png" alt="logo" width={80} height={80} />
      <div className="w-1/6">
        <p className="text-center bg-white p-2 py-3 rounded-xxl mt-4 mr-2 font-bold text-sm leading-6">
          Jay
        </p>
      </div>
    </div>
  );
};

export default Header;

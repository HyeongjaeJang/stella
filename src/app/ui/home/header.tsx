import React from "react";
import Image from "next/image";

const Header = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex justify-between w-full p-2">
      <Image src="/Stella.png" alt="logo" width={80} height={80} />
      <div className="w-1/6">
        <p className="text-center bg-white p-1 py-3 rounded-xxl mt-4 mr-2 font-bold text-sm leading-6">
          {initial}
        </p>
      </div>
    </div>
  );
};

export default Header;

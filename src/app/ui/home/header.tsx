"use client";

import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const Header = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase();
  const router = useRouter();

  const handleLogout = async () => {
    await LogOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between w-full p-2">
      <Image
        src="/Stella.png"
        alt="logo"
        width={80}
        height={80}
        onClick={() => router.push("/home")}
      />
      <div className="w-1/6">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <p className="text-center bg-gray-100 border-2 p-1 py-3 rounded-xxl mt-4 mr-2 font-bold text-sm leading-6 text-black">
              {initial}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLogout()}>
              LogOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;

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
import Link from "next/link";
import { useTheme } from "next-themes";
import { PropsUser } from "@/types/types";

type HeaderProps = {
  name: string;
  user?: PropsUser;
};

const Header = ({ name, user }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const initial = name.charAt(0).toUpperCase();
  const router = useRouter();

  const handleLogout = async () => {
    await LogOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between w-full p-2">
      <Link href="/home">
        <Image
          src="/Stella.png"
          alt="logo"
          width={80}
          height={80}
          priority={true}
          className="cursor-pointer w-auto"
          style={{ width: 80, height: 80 }}
        />
      </Link>
      <div className="w-1/6">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex justify-end">
            <p className="w-full md:w-[3.5rem] text-center bg-gray-100 border-2 p-1 py-3 rounded-xxl mt-4 mr-2 font-bold text-sm leading-6 text-black">
              {initial}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/profile/${user?.id}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              Theme
            </DropdownMenuItem>
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

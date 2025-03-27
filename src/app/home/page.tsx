"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/ui/home/header";
import Buttons from "@/app/ui/home/buttons";
import Cards from "@/app/ui/home/cards";
import { getUser } from "@/app/lib/actions";

const Home = () => {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res) {
        setUser(res.user.name);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-[#2d2d3d]">
      <Header name={user} />
      <div className="p-5">
        <p className="text-xl font-thin text-black dark:text-white">
          {`Hi ${user}, how's your day?`}
        </p>
      </div>
      <Buttons />
      <Cards />
    </div>
  );
};

export default Home;

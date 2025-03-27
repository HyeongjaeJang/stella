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
    <div className="flex flex-col">
      <Header name={user} />
      <div className="p-5">
        <p className="text-xl text-white font-thin">
          {"Hi Jay, how's your day?"}
        </p>
      </div>
      <Buttons />
      <Cards />
    </div>
  );
};

export default Home;

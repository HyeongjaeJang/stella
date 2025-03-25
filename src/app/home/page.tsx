"use client";

import React from "react";
import Header from "@/app/ui/home/header";
import Buttons from "@/app/ui/home/buttons";
import Cards from "@/app/ui/home/cards";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
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

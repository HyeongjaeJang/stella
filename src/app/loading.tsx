"use client";

import React from "react";
import Load from "./ui/load";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-dark">
      <Load />
    </div>
  );
};

export default Loading;

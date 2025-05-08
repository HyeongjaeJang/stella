"use client";

import Header from "@/app/ui/home/header";
import arrow from "../../../../../public/backArrow.svg";
import { CompatibilityGeneratedData, Info } from "@/types/types";
import React, { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResultClient = ({
  info,
  comp,
}: {
  info: Info;
  comp: CompatibilityGeneratedData;
}) => {
  const router = useRouter();

  const goBack = () => {
    router.push("/home");
  };

  console.log("🚀 ~ file: resultClient.tsx:12 ~ ResultClient ~ comp:", comp);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col h-screen">
        <Header
          user={{
            id: info.id.toString(),
            name: info.name,
            z_sign: info.z_sign,
            email: info.email,
          }}
        />
        <div className="flex flex-col gap-7 p-4">
          <div className="flex gap-2">
            <Image
              src={arrow}
              alt="back"
              width={10}
              height={10}
              priority
              onClick={() => goBack()}
            />
            <h1 className="text-2xl font-extralight">Compatibility Result</h1>
          </div>
          <div className="flex flex-col border-2 border-button/30 rounded-lg p-4 gap-2">
            <div className="flex gap-3">
              <div className="bg-noen border-2 border-red-200 dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg text-red-300">
                Sun
              </div>
              <div className="bg-noen border-2 border-amber-200 dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg text-amber-300">
                Moon
              </div>
              <div className="bg-noen border-2 border-gray-200 dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg text-gray-300">
                Mercury
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-noen border-2 border-stone-400 dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg text-stone-500">
                Mars
              </div>
              <div className="bg-noen border-2 border-yellow-400 dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg text-yellow-500">
                Venus
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ResultClient;

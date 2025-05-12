"use client";

import Header from "@/app/ui/home/header";
import { PieChart } from "@mui/x-charts/PieChart";
import arrow from "../../../../../public/backArrow.svg";
import { CompatibilityGeneratedData, Info } from "@/types/types";
import React, { Suspense, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ResetCompatibility } from "@/app/lib/actions";

const ResultClient = ({
  info,
  comp,
}: {
  info: Info;
  comp: CompatibilityGeneratedData;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goBack = () => {
    router.push("/home");
  };

  const reset = async () => {
    startTransition(async () => {
      const redirectUrl = await ResetCompatibility(info.id);
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    });
  };

  const pieData = [
    {
      id: 0,
      value: comp.compatibility_data.sun.score,
      label: "Sun",
      color: "#f0df93",
    },
    {
      id: 1,
      value: comp.compatibility_data.moon.score,
      label: "Moon",
      color: "#a3a6a3",
    },
    {
      id: 2,
      value: comp.compatibility_data.mercury.score,
      label: "Mercury",
      color: "#3b3638",
    },
    {
      id: 3,
      value: comp.compatibility_data.mars.score,
      label: "Mars",
      color: "#dc9787",
    },
    {
      id: 4,
      value: comp.compatibility_data.venus.score,
      label: "Venus",
      color: "#eed7db",
    },
  ];

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
        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-2">
            <Image
              src={arrow}
              alt="back"
              width={10}
              height={10}
              priority
              className="cursor-pointer dark:invert"
              onClick={() => goBack()}
            />
            <h1 className="text-2xl font-extralight">Compatibility Result</h1>
          </div>
          <div className="flex justify-between bg-gray-200 dark:bg-white/10 p-5 rounded-lg items-center gap-5 border-2 border-button/30">
            <div className="bg-[#8ea8ff]/50 p-4 border-2 border-[#8ea8ff]/100 rounded-xxl flex justify-center items-center">
              <p className="text-3xl text-white">{comp.overall_score}</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start text-xs gap-1">
              <p className="mb-1 font-semibold">Summary about love match</p>
              <li>
                <strong>Score:</strong> {comp.overall_score}/100
              </li>
              <li className="break-words">
                <strong>Details:</strong> {comp.overall_details}
              </li>
            </div>
          </div>
          <div className="flex justify-center items-center dark:bg-white/10 border-2 border-button/30 rounded-lg">
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 50,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  arcLabel: (item) => `${item.value}`,
                },
              ]}
              hideLegend
              width={220}
              height={300}
            />
            <div className="flex flex-col w-1/4">
              {pieData.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 justify-start items-center mb-1"
                >
                  <div
                    className="p-1 rounded-full w-3 h-3"
                    style={{
                      backgroundColor: `${item.color}`,
                    }}
                  />
                  <p className="text-xs font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col border-2 border-button/30 rounded-lg p-4 gap-2 dark:bg-white/10 font-semibold">
            <div className="flex gap-3">
              {pieData.slice(0, 3).map((item) => (
                <Link
                  href={`/compatibility/result/${info.id}/${item.label}`}
                  key={item.id}
                  className="bg-none dark:bg-white/20 w-1/3 flex justify-center items-center p-3 rounded-lg"
                  style={{
                    border: `2px solid ${item.color}`,
                    color: `${item.color}`,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              {pieData.slice(3, 5).map((item) => (
                <Link
                  href={`/compatibility/result/${info.id}/${item.label}`}
                  key={item.id}
                  className="bg-none dark:bg-white/5 w-1/3 flex justify-center items-center p-3 rounded-lg"
                  style={{
                    border: `2px solid ${item.color}`,
                    color: `${item.color}`,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => reset()}
              className="bg-button/80 p-3 rounded-xl font-bold text-lg"
              disabled={isPending}
            >
              {isPending ? "Resetting..." : "Reset Data"}
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ResultClient;

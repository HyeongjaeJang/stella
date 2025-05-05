"use client";

import { Suspense } from "react";
import Header from "@/app/ui/home/header";
import { PropsUser } from "@/types/types";
import Image from "next/image";
import sun from "../../../../public/sun.svg";
import moon from "../../../../public/moon.svg";
import star from "../../../../public/star.svg";

type Today =
  | {
      number: number | null;
      id: number;
      user_id: number;
      created_at: Date | null;
      updated_at: Date | null;
      color: string | null;
      item: string | null;
      text: string | null;
      total_score: number | null;
    }
  | null
  | undefined;

type Info =
  | {
      id: number;
      name: string;
      email: string;
      birth_date: Date | null;
      birth_time: Date | null;
      gender: string | null;
      city_country: string | null;
      z_sign: string | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | null
  | undefined;

const ProfileClient = ({
  user,
  today,
  info,
}: {
  user: PropsUser;
  today: Today;
  info: Info;
}) => {
  const handleScoreColor = (score: number | null | undefined) => {
    if (score === null) {
      return "text-gray-500";
    } else if (score! >= 80) {
      return "text-yellow-300";
    } else if (score! >= 40) {
      return "text-green-400";
    } else {
      return "text-red-300";
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user && (
        <div className="flex flex-col h-screen">
          <Header user={user} />
          <div className="flex flex-col p-4">
            <div>
              <h2 className="text-2xl font-thin mb-4">Profile</h2>
              <div className="flex bg-gray-200 dark:bg-[#FFFFFF]/5 border-[1px] border-gray-400 dark:border-[#FFFFFF] rounded-lg p-3 justify-between items-center">
                <div className="bg-button rounded-xxl p-1">
                  <Image
                    src={`/${user.z_sign?.toLowerCase()}.png`}
                    alt="coll"
                    width={80}
                    height={80}
                    priority
                  />
                </div>
                <div className="w-2/3 flex flex-col gap-2">
                  <p className="font-semibold">{user.name}</p>
                  <div className="flex">
                    <p className="text-sm">
                      {info?.birth_date?.toISOString().slice(0, 10)}
                    </p>
                    <p className="text-sm ml-2">
                      {info?.birth_time?.toISOString().slice(11, 16)}
                    </p>
                  </div>
                  <div className="text-sm text-black bg-white p-2 py-1 rounded-lg w-fit">
                    <button>Edit</button>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <h3>Constellation</h3>
                <div className="flex justify-center gap-2">
                  <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-[#FFFFFF]/5 rounded-lg p-3 w-1/3 gap-2">
                    <Image src={sun} alt="sun" width={20} height={20} />
                    <p className="text-xs font-thin">{user.z_sign}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-[#FFFFFF]/5 rounded-lg p-3 w-1/3 gap-2">
                    <Image src={moon} alt="moon" width={20} height={20} />
                    <p className="text-xs font-thin">Moon Sign</p>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-[#FFFFFF]/5 rounded-lg p-3 w-1/3 gap-2">
                    <Image src={star} alt="star" width={20} height={20} />
                    <p className="text-xs font-thin">Rising Sign</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4>{"Today's Fortune"}</h4>
                <div className="flex flex-col bg-gray-100 dark:bg-white/5 p-4 rounded-lg mt-2 gap-1">
                  <p className="text-sm font-thin">{today?.text}</p>
                  <div className="flex justify-start items-center gap-1">
                    <p className="text-xs font-thin">Total Score:</p>
                    <p className={`${handleScoreColor(today?.total_score)}`}>
                      {today?.total_score}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4>Settings</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default ProfileClient;

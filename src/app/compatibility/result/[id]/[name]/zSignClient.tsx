"use client";
import Header from "@/app/ui/home/header";
import { CompatibilityGeneratedData, Info, ZodiacDetails } from "@/types/types";
import React, { Suspense } from "react";
import Image from "next/image";
import arrow from "../../../../../../public/backArrow.svg";
import { useRouter } from "next/navigation";

const ZSignClient = ({
  info,
  comp,
  name,
}: {
  info: Info;
  comp: CompatibilityGeneratedData;
  name: string;
}) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const zodiacType = (name: string) => {
    const validKeys: (keyof ZodiacDetails)[] = [
      "sun",
      "moon",
      "mercury",
      "venus",
      "mars",
    ];
    const z_name = name.toLowerCase() as keyof ZodiacDetails;

    if (validKeys.includes(z_name)) {
      const zodiac = comp.compatibility_data[z_name];
      return zodiac;
    }
  };

  const userZodiacType = (name: string) => {
    const validKeys: (keyof ZodiacDetails)[] = [
      "sun",
      "moon",
      "mercury",
      "venus",
      "mars",
    ];
    const z_name = name.toLowerCase() as keyof ZodiacDetails;

    if (validKeys.includes(z_name)) {
      const zodiac = comp.user_zodiac[z_name];
      return zodiac;
    }
  };

  const partnerZodiacType = (name: string) => {
    const validKeys: (keyof ZodiacDetails)[] = [
      "sun",
      "moon",
      "mercury",
      "venus",
      "mars",
    ];
    const z_name = name.toLowerCase() as keyof ZodiacDetails;

    if (validKeys.includes(z_name)) {
      const zodiac = comp.partner_zodiac[z_name];
      return zodiac;
    }
  };

  console.log(comp);

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
              className="cursor-pointer dark:invert"
              width={10}
              height={10}
              onClick={() => goBack()}
              priority
            />
            <h1 className="text-2xl font-extralight">{`${name}'s Compatibility`}</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-evenly bg-button dark:bg-white/10 p-2 py-3 rounded-lg items-center gap-5">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-sm font-light text-white/80">
                  {"User's Zodiac"}
                </p>
                <Image
                  src={`/${userZodiacType(name)?.sign}.png`}
                  alt="user_zodiac"
                  width={130}
                  height={130}
                />
                <div className="bg-white dark:bg-button p-2 px-4 w-fit rounded-xl">
                  <p>{userZodiacType(name)?.score}</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={"/heart.png"}
                  alt="heart"
                  width={60}
                  height={60}
                  priority
                />
                <p className="absolute right-6 top-4 text-white font-semibold">
                  {zodiacType(name)?.score}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-sm font-light text-white/80">
                  {"Partner's Zodiac"}
                </p>
                <Image
                  src={`/${partnerZodiacType(name)?.sign}.png`}
                  alt="user_zodiac"
                  width={130}
                  height={130}
                />
                <div className="bg-white dark:bg-button p-2 px-4 w-fit rounded-xl">
                  <p>{partnerZodiacType(name)?.score}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="text-xl font-semibold">Overall details</h2>
              <p className="text-sm break-words">{zodiacType(name)?.details}</p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h3 className="text-lg font-semibold">
                Characteristic - {info.name}
              </h3>
              <p className="text-sm break-words">
                {userZodiacType(name)?.details}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h3 className="text-lg font-semibold">
                Characteristic - Partner
              </h3>
              <p className="text-sm break-words">
                {partnerZodiacType(name)?.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ZSignClient;

"use client";

import Header from "@/app/ui/home/header";
import { Info } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
import arrow from "../../../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import User1 from "@/app/ui/compatibility/user1";
import {
  CheckCompatibility,
  CheckExcistCompatibility,
} from "@/app/lib/actions";
import Load from "@/app/ui/load";

const CompatibilityClient = ({ info }: { info: Info }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [user2Data, setUser2Data] = useState<Partial<Info>>({
    name: "",
    birth_date: null,
    birth_time: null,
    gender: "",
    city_country: "",
  });

  useEffect(() => {
    const checkCompatibility = async () => {
      const redirectUrl = await CheckExcistCompatibility(info.id);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        setIsLoading(false);
      }
    };

    checkCompatibility();
  }, [info.id, router]);

  const handleSubmit = async () => {
    await CheckCompatibility(info, user2Data);
    router.push(`/compatibility/result/${info.id}`);
  };

  const goBack = () => {
    router.push("/home");
  };

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

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Load />
          </div>
        ) : !edit ? (
          <div className="flex flex-col gap-2 p-4">
            <div className="flex gap-2">
              <Image
                src={arrow}
                alt="back"
                width={10}
                height={10}
                priority
                onClick={() => goBack()}
                className="cursor-pointer dark:invert"
              />
              <h2 className="text-2xl font-extralight">Your partner profile</h2>
            </div>
            <User1
              setFormData={(data) => setUser2Data(data)}
              edit={() => setEdit(!edit)}
              formData={user2Data}
            />
          </div>
        ) : (
          <div className="flex h-3/4 justify-center items-center gap-2">
            <button
              onClick={() => setEdit(!edit)}
              className="w-fit bg-white/5 text-white p-3 rounded-lg"
            >
              Edit Profile
            </button>
            <button
              onClick={handleSubmit}
              className="w-fit bg-button text-white p-3 rounded-lg"
            >
              Check Compatibility
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default CompatibilityClient;

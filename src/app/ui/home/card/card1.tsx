import React from "react";
import Image from "next/image";
import { getToday } from "@/app/lib/actions";
import { useEffect } from "react";

type Info = {
  z_sign: string | null;
  email: string;
};

type Today = {
  color: string | null;
  id: number;
  item: string | null;
  number: number | null;
  total_score: number | null;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
};

const Card1 = ({ z_sign, email }: Info) => {
  const [today, setToday] = React.useState<Today | null>(null);
  useEffect(() => {
    const fetchToday = async () => {
      const today = await getToday(email);
      if (today) {
        setToday(today);
      }
    };
    fetchToday();
  }, []);

  return (
    <div>
      {today && (
        <div className="flex flex-col justify-center items-center">
          <Image
            src={`/${z_sign?.toLowerCase()}.png`}
            alt="coll"
            width={180}
            height={180}
            className="mt-5"
          />
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-center items-center gap-2">
              <div>Score:</div>
              <div className="text-3xl text-white font-bold">
                {today.total_score}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div>Color:</div>
              <div className="font-bold">{today.color}</div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="flex gap-2">
                <div>Number:</div>
                <div className="font-bold">{today.number}</div>
              </div>
              <div className="flex gap-2">
                <div>Item:</div>
                <div className="font-bold">{today.item}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card1;

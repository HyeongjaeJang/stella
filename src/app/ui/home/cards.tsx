import React, { useState } from "react";
import { motion } from "framer-motion";
import { getZodiacInfo } from "@/app/lib/actions";
import { useEffect } from "react";
import Card1 from "@/app/ui/home/card/card1";
import Card2 from "@/app/ui/home/card/card2";
import Card3 from "@/app/ui/home/card/card3";
import Card4 from "@/app/ui/home/card/card4";

type PropsUser = {
  id: string;
  name: string;
  email: string;
  z_sign: string | null;
};

const Cards = ({ user }: { user: PropsUser }) => {
  const [centerIndex, setCenterIndex] = useState(0);

  const cards = [
    <Card1 key={1} z_sign={user.z_sign} email={user.email} />,
    <Card2 key={2} email={user.email} />,
    <Card3 key={3} email={user.email} />,
    <Card4 key={4} email={user.email} />,
  ];

  const getRelativeIndex = (i: number, center: number, length: number) => {
    let diff = i - center;

    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;

    return diff;
  };

  useEffect(() => {
    getZodiacInfo(user.email);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center mt-8 h-96">
      {cards.map((card, index) => {
        const rel = getRelativeIndex(index, centerIndex, cards.length);

        let x = 0;
        let scale = 1;
        let opacity = 1;
        const zIndex = 10 - Math.abs(rel);

        if (rel === 0) {
          x = 0;
          scale = 1;
        } else if (rel === -1) {
          x = -50;
          scale = 0.95;
        } else if (rel === 1) {
          x = 50;
          scale = 0.95;
        } else {
          opacity = 0;
        }

        return (
          <motion.div
            key={index}
            layout
            drag={rel === 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (rel === 0) {
                if (info.offset.x < -80) {
                  const nextIndex = (centerIndex + 1) % cards.length;
                  setCenterIndex(nextIndex);
                } else if (info.offset.x > 80) {
                  const prevIndex =
                    (centerIndex - 1 + cards.length) % cards.length;
                  setCenterIndex(prevIndex);
                }
              }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setCenterIndex(index)}
            className="absolute w-64 h-96 bg-button rounded-xl text-white text-center flex items-center justify-center shadow-xl cursor-pointer"
            style={{ zIndex, opacity }}
            animate={{ x, scale, opacity }}
            whileTap={{ scale: 0.98 }}
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;

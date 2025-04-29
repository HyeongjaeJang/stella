import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getZodiacInfo } from "@/app/lib/actions";
import Card1 from "@/app/ui/home/card/card1";
import Card2 from "@/app/ui/home/card/card2";
import Card3 from "@/app/ui/home/card/card3";
import Card4 from "@/app/ui/home/card/card4";
import Card5 from "@/app/ui/home/card/card5";
import Card6 from "@/app/ui/home/card/card6";
import border from "../../../../public/border.svg";
import { Today, Work, People, Finance, Health, Mood } from "@/types/cardTypes";
import { PropsUser } from "@/types/types";

const Cards = ({
  user,
  today,
  work,
  people,
  finance,
  health,
  mood,
}: {
  user: PropsUser;
  today: Today;
  work: Work;
  people: People;
  finance: Finance;
  health: Health;
  mood: Mood;
}) => {
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    (async () => {
      await getZodiacInfo(user.email);
    })();
  }, [user.email]);

  const cards = [
    <Card1 key={1} z_sign={user.z_sign} today={today} />,
    <Card2 key={2} work={work} />,
    <Card3 key={3} people={people} />,
    <Card4 key={4} finance={finance} />,
    <Card5 key={5} health={health} />,
    <Card6 key={6} mood={mood} />,
  ];

  const getRelativeIndex = (i: number, center: number, length: number) => {
    let diff = i - center;

    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;

    return diff;
  };

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
            className="absolute w-64 h-96 bg-center bg-no-repeat bg-button rounded-xl text-white text-center flex items-center justify-center shadow-xl cursor-pointer"
            style={{
              zIndex,
              opacity,
              backgroundImage: `url(${border.src})`,
              backgroundSize: "95% 95%",
            }}
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

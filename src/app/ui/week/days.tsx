import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import arrow from "../../../../public/arrow.svg";

type DaysProps = {
  days?: Record<string, string>;
};

const Days = ({ days }: DaysProps) => {
  const [openDay, setOpenDay] = useState<string | null>(null);

  const handleToggle = (day: string) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  return (
    <div>
      <p className="text-xl font-bold my-4 text-button">Days Analysis</p>
      {days && (
        <div className="my-4 space-y-2">
          {Object.entries(days)
            .sort(([dayA], [dayB]) => {
              const dayOrder = [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ];
              return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
            })
            .map(([day, text]) => (
              <div
                key={day}
                onClick={() => handleToggle(day)}
                className="p-2 bg-gray-300 dark:bg-white/10 rounded-md flex flex-col justify-between items-center"
              >
                <div className="flex w-full justify-between items-center">
                  <p className="font-bold">{day}</p>
                  <motion.div
                    animate={{ rotate: openDay === day ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 relative pr-2"
                  >
                    <Image
                      src={arrow.src}
                      alt="arrow"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>
                {openDay === day && (
                  <p className="text-sm mt-1 p-1 w-full">{text}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Days;

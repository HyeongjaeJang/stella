import React from "react";

type DaysProps = {
  days?: Record<string, string>;
};

const Days = ({ days }: DaysProps) => {
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
                className="p-2 bg-gray-500 rounded-md text-white flex justify-between items-center"
              >
                <p className="font-bold">{day}</p>
                <p className="text-sm">{text}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Days;

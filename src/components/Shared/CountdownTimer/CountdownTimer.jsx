import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ onExpire, departureDateTime }) => {
  return (
    <Countdown
      date={new Date(departureDateTime)}
      onComplete={onExpire}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <span className="text-red-500 font-semibold">
              Departed
            </span>
          );
        }

        const timeData = [
          { val: days, label: "Days" },
          { val: hours, label: "Hours" },
          { val: minutes, label: "Mins" },
          { val: seconds, label: "Secs" },
        ];

        return (
          <div className="grid grid-cols-4 gap-2 text-center">
            {timeData.map((t) => (
              <div key={t.label} className="bg-blue-50 p-2 rounded-lg">
                <p className="text-xl font-bold text-primary">
                  {t.val}
                </p>
                <p className="text-[10px] text-secondary-content uppercase">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};

export default CountdownTimer;
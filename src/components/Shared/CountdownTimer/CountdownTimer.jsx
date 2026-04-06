import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ onExpire, departureDateTime }) => {
  const handleComplete = () => {
    if (onExpire) onExpire(); 
  };
  return (
    <Countdown
      date={new Date(departureDateTime)}
      onComplete={handleComplete}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span className="text-red-500 font-semibold">Departed</span>;
        } else {
          return (
            <span>
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          );
        }
      }}
    />
  );
};

export default CountdownTimer;

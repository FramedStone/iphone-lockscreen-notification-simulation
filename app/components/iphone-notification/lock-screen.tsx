import React from "react";
import { format } from "date-fns";

interface LockScreenProps {
  currentTime: Date;
  dateFormat: string;
  timeFormat: string;
}

export function LockScreen({
  currentTime,
  dateFormat,
  timeFormat,
}: LockScreenProps) {
  return (
    <div className="text-center text-white">
      <div className="text-6xl font-thin mb-2">
        {format(currentTime, timeFormat)}
      </div>
      <div className="text-lg">{format(currentTime, dateFormat)}</div>
    </div>
  );
}

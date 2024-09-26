import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LockScreenProps {
  currentTime: Date;
}

export function LockScreen({ currentTime }: LockScreenProps) {
  const [customDate, setCustomDate] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      const now = new Date();
      setCustomDate(now.toISOString().split("T")[0]);
      setCustomTime(now.toTimeString().slice(0, 5));
    }
  };

  const displayDate = customDate ? new Date(customDate) : currentTime;
  const displayTime = customTime
    ? new Date(`${customDate}T${customTime}`)
    : currentTime;

  return (
    <div className="text-white text-center mt-4">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="custom-date" className="text-white">
              Date:
            </Label>
            <Input
              id="custom-date"
              type="date"
              value={customDate}
              onChange={handleDateChange}
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="custom-time" className="text-white">
              Time:
            </Label>
            <Input
              id="custom-time"
              type="time"
              value={customTime}
              onChange={handleTimeChange}
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>
          <Button
            onClick={toggleEdit}
            variant="outline"
            className="text-white border-white"
          >
            Done
          </Button>
        </div>
      ) : (
        <>
          <div className="text-2xl font-light mb-2">
            {formatDate(displayDate)}
          </div>
          <div className="text-8xl font-bold">{formatTime(displayTime)}</div>
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="mt-4 text-white"
          >
            Edit Time/Date
          </Button>
        </>
      )}
    </div>
  );
}

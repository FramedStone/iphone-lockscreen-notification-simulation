interface LockScreenProps {
  currentTime: Date;
}

export function LockScreen({ currentTime }: LockScreenProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="text-white text-center mt-4">
      <div className="text-8xl font-thin mb-1">
        {currentTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <div className="text-2xl font-light">{formatDate(currentTime)}</div>
    </div>
  );
}

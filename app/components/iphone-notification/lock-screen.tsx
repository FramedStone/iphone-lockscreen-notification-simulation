interface LockScreenProps {
  currentTime: Date;
}

export function LockScreen({ currentTime }: LockScreenProps) {
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

  return (
    <div className="text-white text-center mt-4">
      <div className="text-2xl font-light mb-2">{formatDate(currentTime)}</div>
      <div className="text-8xl font-bold">{formatTime(currentTime)}</div>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Notification {
  timestamp: Date;
  showAsNow: boolean;
}

export function formatTimestamp(notification: Notification) {
  if (notification.showAsNow) {
    return "now";
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (notification.timestamp.toDateString() === now.toDateString()) {
    return `Today ${notification.timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (
    notification.timestamp.toDateString() === yesterday.toDateString()
  ) {
    return `Yesterday ${notification.timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    return notification.timestamp.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  }
}

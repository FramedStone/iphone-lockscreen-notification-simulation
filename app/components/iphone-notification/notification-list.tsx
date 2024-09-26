import { formatTimestamp } from "@/app/lib/utils";

interface Notification {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  showAsNow: boolean;
  profilePicture?: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onRemoveNotification: (id: string) => void;
  notificationYOffset: number;
}

export function NotificationList({
  notifications,
  onRemoveNotification,
  notificationYOffset,
}: NotificationListProps) {
  return (
    <div
      className="absolute inset-x-0 space-y-4 px-4"
      style={{ top: `${notificationYOffset}px` }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-4 cursor-pointer"
          onClick={() => onRemoveNotification(notification.id)}
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
              {notification.profilePicture ? (
                <img
                  src={notification.profilePicture}
                  alt={notification.sender}
                  className="w-full h-full object-cover"
                />
              ) : (
                notification.sender.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-white">
                  {notification.sender}
                </div>
                <div className="text-xs text-gray-400">
                  {formatTimestamp(notification)}
                </div>
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {notification.message}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useState, useCallback } from "react";
import { formatTimestamp } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Trash2, Edit } from "lucide-react";

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
  onSwapNotifications: (fromIndex: number, toIndex: number) => void;
  onEditNotification: (
    id: string,
    updatedNotification: Partial<Notification>
  ) => void;
  notificationYOffset: number;
}

export function NotificationList({
  notifications,
  onRemoveNotification,
  onSwapNotifications,
  onEditNotification,
  notificationYOffset,
}: NotificationListProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNotification, setEditedNotification] = useState<
    Partial<Notification>
  >({});

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsEditMode(false);
  };

  const handleSwapUp = () => {
    if (selectedNotification) {
      const currentIndex = notifications.findIndex(
        (n) => n.id === selectedNotification.id
      );
      if (currentIndex > 0) {
        onSwapNotifications(currentIndex, currentIndex - 1);
      }
      setSelectedNotification(null);
    }
  };

  const handleSwapDown = () => {
    if (selectedNotification) {
      const currentIndex = notifications.findIndex(
        (n) => n.id === selectedNotification.id
      );
      if (currentIndex < notifications.length - 1) {
        onSwapNotifications(currentIndex, currentIndex + 1);
      }
      setSelectedNotification(null);
    }
  };

  const handleDelete = () => {
    if (selectedNotification) {
      onRemoveNotification(selectedNotification.id);
      setSelectedNotification(null);
    }
  };

  const handleEdit = () => {
    if (selectedNotification) {
      setEditedNotification({
        sender: selectedNotification.sender,
        message: selectedNotification.message,
        timestamp: selectedNotification.timestamp,
      });
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedNotification && editedNotification) {
      onEditNotification(selectedNotification.id, editedNotification);
      setIsEditMode(false);
      setSelectedNotification(null);
    }
  };

  return (
    <div
      className="absolute inset-x-0 space-y-4 px-4"
      style={{ top: `${notificationYOffset}px` }}
    >
      {notifications.map((notification, index) => (
        <Popover
          key={notification.id}
          open={selectedNotification?.id === notification.id}
          onOpenChange={(isOpen) => !isOpen && setSelectedNotification(null)}
        >
          <PopoverTrigger asChild>
            <div
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-4 cursor-pointer"
              onClick={() => handleNotificationClick(notification)}
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
          </PopoverTrigger>
          <PopoverContent className="w-64">
            {isEditMode ? (
              <div className="flex flex-col space-y-2">
                <Input
                  value={editedNotification.sender}
                  onChange={(e) =>
                    setEditedNotification({
                      ...editedNotification,
                      sender: e.target.value,
                    })
                  }
                  placeholder="Sender"
                  className="w-full"
                />
                <Input
                  value={editedNotification.message}
                  onChange={(e) =>
                    setEditedNotification({
                      ...editedNotification,
                      message: e.target.value,
                    })
                  }
                  placeholder="Message"
                  className="w-full"
                />
                <Input
                  type="datetime-local"
                  value={
                    editedNotification.timestamp
                      ? new Date(editedNotification.timestamp)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEditedNotification({
                      ...editedNotification,
                      timestamp: new Date(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleSwapUp}
                  disabled={index === 0}
                >
                  <ChevronUp className="mr-2 h-4 w-4" /> Move Up
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleSwapDown}
                  disabled={index === notifications.length - 1}
                >
                  <ChevronDown className="mr-2 h-4 w-4" /> Move Down
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleEdit}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-red-500"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

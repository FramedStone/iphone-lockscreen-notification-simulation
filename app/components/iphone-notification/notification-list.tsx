import React, { useState, useRef, useCallback } from "react";
import { formatTimestamp } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  notificationYOffset: number;
}

export function NotificationList({
  notifications,
  onRemoveNotification,
  onSwapNotifications,
  notificationYOffset,
}: NotificationListProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [deletingNotification, setDeletingNotification] =
    useState<Notification | null>(null);
  const draggedItemRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const isDragging = useRef(false);

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      setDraggingIndex(index);
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
      draggedItemRef.current = e.currentTarget;
      isDragging.current = true;
      if (draggedItemRef.current) {
        draggedItemRef.current.style.opacity = "0.5";
        draggedItemRef.current.style.zIndex = "10";
      }
    },
    []
  );

  const handleDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        draggingIndex === null ||
        !draggedItemRef.current ||
        !isDragging.current
      )
        return;

      const deltaX = e.clientX - dragStartX.current;
      const deltaY = e.clientY - dragStartY.current;
      draggedItemRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // Check if dragged out of the iPhone frame
      const iPhoneFrame = draggedItemRef.current.closest(".iphone-frame");
      if (iPhoneFrame) {
        const frameRect = iPhoneFrame.getBoundingClientRect();
        const itemRect = draggedItemRef.current.getBoundingClientRect();

        if (
          itemRect.right < frameRect.left ||
          itemRect.left > frameRect.right ||
          itemRect.bottom < frameRect.top ||
          itemRect.top > frameRect.bottom
        ) {
          setDeletingNotification(notifications[draggingIndex]);
          handleDragEnd();
        }
      }

      // Swapping logic
      const itemHeight = draggedItemRef.current.offsetHeight;
      const swapThreshold = itemHeight / 2;

      if (Math.abs(deltaY) > swapThreshold) {
        const newIndex = draggingIndex + (deltaY > 0 ? 1 : -1);
        if (newIndex >= 0 && newIndex < notifications.length) {
          onSwapNotifications(draggingIndex, newIndex);
          setDraggingIndex(newIndex);
          dragStartY.current = e.clientY;
        }
      }
    },
    [draggingIndex, notifications, onSwapNotifications]
  );

  const handleDragEnd = useCallback(() => {
    if (draggedItemRef.current) {
      draggedItemRef.current.style.opacity = "1";
      draggedItemRef.current.style.transform = "translate(0, 0)";
      draggedItemRef.current.style.zIndex = "auto";
    }
    setDraggingIndex(null);
    isDragging.current = false;
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deletingNotification) {
      onRemoveNotification(deletingNotification.id);
      setDeletingNotification(null);
    }
  }, [deletingNotification, onRemoveNotification]);

  return (
    <>
      <div
        className="absolute inset-x-0 space-y-4 px-4 iphone-frame"
        style={{ top: `${notificationYOffset}px` }}
      >
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-4 cursor-move"
            onMouseDown={(e) => handleDragStart(e, index)}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
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
      <AlertDialog
        open={!!deletingNotification}
        onOpenChange={() => setDeletingNotification(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

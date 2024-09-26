"use client";

import { useState, useEffect } from "react";
import { BackgroundImageUpload } from "./iphone-notification/background-image-upload";
import { NotificationForm } from "./iphone-notification/notification-form";
import { NotificationList } from "./iphone-notification/notification-list";
import { StatusBar } from "./iphone-notification/status-bar";
import { DynamicIsland } from "./iphone-notification/dynamic-island";
import { LockScreen } from "./iphone-notification/lock-screen";
import { BottomIcons } from "./iphone-notification/bottom-icons";
import { DraggableScrollbar } from "./iphone-notification/draggable-scrollbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Notification {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  showAsNow: boolean;
  profilePicture?: string;
}

export default function IPhoneNotification() {
  const [mobileNetwork, setMobileNetwork] = useState("U Mobile");
  const [backgroundImage, setBackgroundImage] = useState(
    "/placeholder.svg?height=932&width=430"
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusBarPadding, setStatusBarPadding] = useState(33);
  const [dynamicIslandMargin, setDynamicIslandMargin] = useState(15);
  const [bottomIconsPadding, setBottomIconsPadding] = useState(8);
  const [notificationYOffset, setNotificationYOffset] = useState(200);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addNotification = (notification: Notification) => {
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleScrollbarDrag = (percentage: number) => {
    setNotificationYOffset(Math.round(percentage * 932));
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md space-y-4 mr-8">
        <div>
          <Label htmlFor="mobileNetwork">Mobile Network</Label>
          <Input
            id="mobileNetwork"
            value={mobileNetwork}
            onChange={(e) => setMobileNetwork(e.target.value)}
            placeholder="Enter mobile network name"
          />
        </div>
        <BackgroundImageUpload onImageChange={setBackgroundImage} />
        <div>
          <Label htmlFor="statusBarPadding">Status Bar Padding (px)</Label>
          <Input
            id="statusBarPadding"
            type="number"
            value={statusBarPadding}
            onChange={(e) => setStatusBarPadding(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="dynamicIslandMargin">
            Dynamic Island Margin Top (px)
          </Label>
          <Input
            id="dynamicIslandMargin"
            type="number"
            value={dynamicIslandMargin}
            onChange={(e) => setDynamicIslandMargin(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="bottomIconsPadding">Bottom Icons Padding (px)</Label>
          <Input
            id="bottomIconsPadding"
            type="number"
            value={bottomIconsPadding}
            onChange={(e) => setBottomIconsPadding(Number(e.target.value))}
          />
        </div>
        <NotificationForm onAddNotification={addNotification} />
      </div>

      <div className="flex items-start">
        <div
          className="relative w-[430px] h-[932px] rounded-[68px] overflow-hidden shadow-xl bg-black"
          style={{ boxShadow: "0 0 0 4px rgba(0,0,0,0.7)" }}
        >
          <img
            src={backgroundImage}
            alt="iPhone background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col bg-black/30 backdrop-blur-sm">
            <StatusBar
              mobileNetwork={mobileNetwork}
              statusBarPadding={statusBarPadding}
            />
            <DynamicIsland dynamicIslandMargin={dynamicIslandMargin} />

            <div className="flex-1 flex flex-col justify-between p-8">
              <LockScreen currentTime={currentTime} />
              <NotificationList
                notifications={notifications}
                onRemoveNotification={removeNotification}
                notificationYOffset={notificationYOffset}
              />
            </div>

            <BottomIcons bottomIconsPadding={bottomIconsPadding} />
          </div>
        </div>

        <DraggableScrollbar
          notificationYOffset={notificationYOffset}
          onScrollbarDrag={handleScrollbarDrag}
        />
      </div>
    </div>
  );
}

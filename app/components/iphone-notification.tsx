"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Slider } from "@/components/ui/slider";

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
  const [backgroundBlur, setBackgroundBlur] = useState(0);
  const [backgroundSize, setBackgroundSize] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [customDate, setCustomDate] = useState(
    currentTime.toISOString().split("T")[0]
  );
  const [customTime, setCustomTime] = useState(
    currentTime.toTimeString().slice(0, 5)
  );
  const [statusBarPadding, setStatusBarPadding] = useState(33);
  const [dynamicIslandMargin, setDynamicIslandMargin] = useState(15);
  const [bottomIconsPadding, setBottomIconsPadding] = useState(8);
  const [notificationYOffset, setNotificationYOffset] = useState(200);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  }, []);

  const swapNotifications = useCallback(
    (fromIndex: number, toIndex: number) => {
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications];
        const [removed] = newNotifications.splice(fromIndex, 1);
        newNotifications.splice(toIndex, 0, removed);
        return newNotifications;
      });
    },
    []
  );

  const editNotification = useCallback(
    (id: string, updatedNotification: Partial<Notification>) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, ...updatedNotification }
            : notification
        )
      );
    },
    []
  );

  const handleScrollbarDrag = useCallback((percentage: number) => {
    setNotificationYOffset(Math.round(percentage * 932));
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const displayTime = new Date(`${customDate}T${customTime}`);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md space-y-4 mr-8 text-black">
        <div>
          <Label htmlFor="mobileNetwork" className="text-black">
            Mobile Network
          </Label>
          <Input
            id="mobileNetwork"
            value={mobileNetwork}
            onChange={(e) => setMobileNetwork(e.target.value)}
            placeholder="Enter mobile network name"
            className="text-black placeholder-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="custom-date" className="text-black">
            Date:
          </Label>
          <Input
            id="custom-date"
            type="date"
            value={customDate}
            onChange={handleDateChange}
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="custom-time" className="text-black">
            Time:
          </Label>
          <Input
            id="custom-time"
            type="time"
            value={customTime}
            onChange={handleTimeChange}
            className="text-black"
          />
        </div>
        <BackgroundImageUpload onImageChange={setBackgroundImage} />
        <div>
          <Label htmlFor="backgroundBlur" className="text-black">
            Background Blur
          </Label>
          <Slider
            id="backgroundBlur"
            min={0}
            max={20}
            step={1}
            value={[backgroundBlur]}
            onValueChange={(value) => setBackgroundBlur(value[0])}
            className="my-2"
          />
          <div className="text-sm text-gray-500">{backgroundBlur}px</div>
        </div>
        <div>
          <Label htmlFor="backgroundSize" className="text-black">
            Background Size
          </Label>
          <Slider
            id="backgroundSize"
            min={100}
            max={200}
            step={1}
            value={[backgroundSize]}
            onValueChange={(value) => setBackgroundSize(value[0])}
            className="my-2"
          />
          <div className="text-sm text-gray-500">{backgroundSize}%</div>
        </div>
        <div>
          <Label htmlFor="statusBarPadding" className="text-black">
            Status Bar Padding (px)
          </Label>
          <Input
            id="statusBarPadding"
            type="number"
            value={statusBarPadding}
            onChange={(e) => setStatusBarPadding(Number(e.target.value))}
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="dynamicIslandMargin" className="text-black">
            Dynamic Island Margin Top (px)
          </Label>
          <Input
            id="dynamicIslandMargin"
            type="number"
            value={dynamicIslandMargin}
            onChange={(e) => setDynamicIslandMargin(Number(e.target.value))}
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="bottomIconsPadding" className="text-black">
            Bottom Icons Padding (px)
          </Label>
          <Input
            id="bottomIconsPadding"
            type="number"
            value={bottomIconsPadding}
            onChange={(e) => setBottomIconsPadding(Number(e.target.value))}
            className="text-black"
          />
        </div>
        <NotificationForm onAddNotification={addNotification} />
      </div>

      <div className="flex items-start">
        <div
          className="relative w-[430px] h-[932px] rounded-[68px] overflow-hidden shadow-xl bg-black iphone-frame"
          style={{ boxShadow: "0 0 0 4px rgba(0,0,0,0.7)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={backgroundImage}
              alt="iPhone background"
              className="absolute w-full h-full object-cover"
              style={{
                filter: `blur(${backgroundBlur}px)`,
                transform: `scale(${backgroundSize / 100})`,
                transformOrigin: "center",
              }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col">
            <StatusBar
              mobileNetwork={mobileNetwork}
              statusBarPadding={statusBarPadding}
            />
            <DynamicIsland dynamicIslandMargin={dynamicIslandMargin} />

            <div className="flex-1 flex flex-col justify-between p-8">
              <LockScreen currentTime={displayTime} />
              <NotificationList
                notifications={notifications}
                onRemoveNotification={removeNotification}
                onSwapNotifications={swapNotifications}
                onEditNotification={editNotification}
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

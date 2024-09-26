"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NotificationFormProps {
  onAddNotification: (notification: any) => void;
}

export function NotificationForm({ onAddNotification }: NotificationFormProps) {
  const [newSender, setNewSender] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newTimestamp, setNewTimestamp] = useState<Date | null>(null);
  const [useCurrentTime, setUseCurrentTime] = useState(false);
  const [showAsNow, setShowAsNow] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setNewTimestamp(date);
  };

  const handleAddNotification = () => {
    if (newSender && newMessage) {
      const timestamp = useCurrentTime
        ? new Date()
        : newTimestamp || new Date();
      onAddNotification({
        id: Date.now().toString(),
        sender: newSender,
        message: newMessage,
        timestamp,
        showAsNow,
        profilePicture: newProfilePicture,
      });
      setNewSender("");
      setNewMessage("");
      setNewTimestamp(null);
      setNewProfilePicture("");
      setShowAsNow(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="newSender">New Notification Sender</Label>
        <Input
          id="newSender"
          value={newSender}
          onChange={(e) => setNewSender(e.target.value)}
          placeholder="Enter sender name"
        />
      </div>
      <div>
        <Label htmlFor="newMessage">New Notification Message</Label>
        <Textarea
          id="newMessage"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useCurrentTime"
            checked={useCurrentTime}
            onCheckedChange={(checked) => setUseCurrentTime(checked as boolean)}
          />
          <Label htmlFor="useCurrentTime">Use current time</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showAsNow"
            checked={showAsNow}
            onCheckedChange={(checked) => setShowAsNow(checked as boolean)}
          />
          <Label htmlFor="showAsNow">Show as &quot;now&quot;</Label>
        </div>
        {!useCurrentTime && !showAsNow && (
          <div>
            <Label htmlFor="newTimestamp">New Notification Timestamp</Label>
            <DatePicker
              selected={newTimestamp}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border rounded"
              placeholderText="Select date and time"
            />
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="newProfilePicture">
          New Notification Profile Picture
        </Label>
        <Input
          id="newProfilePicture"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <Button onClick={handleAddNotification}>Add Notification</Button>
    </div>
  );
}

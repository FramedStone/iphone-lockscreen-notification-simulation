import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BackgroundImageUploadProps {
  onImageChange: (image: string) => void;
}

export function BackgroundImageUpload({
  onImageChange,
}: BackgroundImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label htmlFor="background" className="text-black">
        Background Image
      </Label>
      <Input
        id="background"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-black"
      />
    </div>
  );
}

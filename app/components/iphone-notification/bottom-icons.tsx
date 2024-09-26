import { Button } from "@/components/ui/button";
import { Camera, Flashlight } from "lucide-react";

interface BottomIconsProps {
  bottomIconsPadding: number;
}

export function BottomIcons({ bottomIconsPadding }: BottomIconsProps) {
  return (
    <div
      className="absolute bottom-0 inset-x-0 px-8 flex flex-col items-center"
      style={{ paddingBottom: `${bottomIconsPadding}px` }}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800/50 text-white w-14 h-14 flex items-center justify-center"
        >
          <Flashlight className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800/50 text-white w-14 h-14 flex items-center justify-center"
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>
      <div className="w-[120px] h-1 bg-white rounded-full"></div>
    </div>
  );
}

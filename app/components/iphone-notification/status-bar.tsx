import { Wifi } from "lucide-react";

interface StatusBarProps {
  mobileNetwork: string;
  statusBarPadding: number;
}

export function StatusBar({ mobileNetwork, statusBarPadding }: StatusBarProps) {
  return (
    <div
      className="absolute inset-x-0 top-0 flex justify-between items-center px-8 text-white z-10"
      style={{ height: `${statusBarPadding * 2}px` }}
    >
      <div>{mobileNetwork}</div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-[2px] items-end h-4">
          <div className="w-[3px] h-1 bg-white"></div>
          <div className="w-[3px] h-2 bg-white"></div>
          <div className="w-[3px] h-3 bg-white"></div>
          <div className="w-[3px] h-4 bg-white"></div>
        </div>
        <Wifi className="h-5 w-5 stroke-[3]" />
        <div className="w-8 h-4 border border-white rounded-sm relative">
          <div className="absolute top-0.5 bottom-0.5 left-0.5 right-2 bg-white"></div>
          <div className="absolute right-[-2px] top-1/2 transform -translate-y-1/2 w-0.5 h-2 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

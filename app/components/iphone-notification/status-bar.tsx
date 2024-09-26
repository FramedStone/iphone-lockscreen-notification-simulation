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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-wifi"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
        <div className="w-8 h-4 border-2 border-white rounded-sm relative">
          <div className="absolute top-0.5 bottom-0.5 left-0.5 right-2 bg-white"></div>
          <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-1 h-2 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

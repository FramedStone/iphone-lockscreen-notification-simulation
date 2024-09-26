"use client";

import { useRef } from "react";

interface DraggableScrollbarProps {
  notificationYOffset: number;
  onScrollbarDrag: (percentage: number) => void;
}

export function DraggableScrollbar({
  notificationYOffset,
  onScrollbarDrag,
}: DraggableScrollbarProps) {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && scrollbarRef.current) {
      const rect = scrollbarRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percentage = Math.min(Math.max(y / rect.height, 0), 1);
      onScrollbarDrag(percentage);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={scrollbarRef}
      className="w-4 h-[932px] bg-gray-200 rounded-full ml-4 cursor-pointer relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="w-4 h-8 bg-gray-400 rounded-full absolute"
        style={{ top: `${(notificationYOffset / 932) * 100}%` }}
      />
    </div>
  );
}

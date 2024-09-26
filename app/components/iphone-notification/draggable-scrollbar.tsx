"use client";

import { useRef, useEffect, useState } from "react";

interface DraggableScrollbarProps {
  notificationYOffset: number;
  onScrollbarDrag: (percentage: number) => void;
}

export function DraggableScrollbar({
  notificationYOffset,
  onScrollbarDrag,
}: DraggableScrollbarProps) {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startThumbTop, setStartThumbTop] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const scrollbarRect = scrollbarRef.current?.getBoundingClientRect();
      if (!scrollbarRect) return;

      const newY = e.clientY - scrollbarRect.top;
      const scrollbarHeight = scrollbarRect.height;
      const thumbHeight = thumbRef.current?.offsetHeight || 0;

      let newTop = startThumbTop + (newY - startY);
      newTop = Math.max(0, Math.min(newTop, scrollbarHeight - thumbHeight));

      const percentage = newTop / (scrollbarHeight - thumbHeight);
      onScrollbarDrag(percentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onScrollbarDrag, startY, startThumbTop]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbRef.current) return;

    setIsDragging(true);
    setStartY(e.clientY);
    setStartThumbTop(thumbRef.current.offsetTop);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    const scrollbarRect = scrollbarRef.current?.getBoundingClientRect();
    if (!scrollbarRect) return;

    const clickY = e.clientY - scrollbarRect.top;
    const scrollbarHeight = scrollbarRect.height;
    const thumbHeight = thumbRef.current?.offsetHeight || 0;

    const percentage =
      (clickY - thumbHeight / 2) / (scrollbarHeight - thumbHeight);
    onScrollbarDrag(Math.max(0, Math.min(percentage, 1)));
  };

  return (
    <div
      ref={scrollbarRef}
      className="w-4 h-[932px] bg-gray-200 rounded-full ml-4 cursor-pointer relative"
      onClick={handleTrackClick}
    >
      <div
        ref={thumbRef}
        className="w-4 h-8 bg-gray-400 rounded-full absolute"
        style={{ top: `${(notificationYOffset / 932) * 100}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

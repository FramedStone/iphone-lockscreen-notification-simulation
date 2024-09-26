interface DynamicIslandProps {
  dynamicIslandMargin: number;
}

export function DynamicIsland({ dynamicIslandMargin }: DynamicIslandProps) {
  return (
    <div
      className="w-[126px] h-[37.33px] bg-black rounded-full mx-auto"
      style={{ marginTop: `${dynamicIslandMargin}px` }}
    ></div>
  );
}

import * as Avatar from "@radix-ui/react-avatar";
import React from "react";

const AvatarCustom = ({
  height,
  width,
  className,
  src,
}: {
  height: number;
  width: number;
  className?: string;
  src: string;
}) => {
  return (
    <Avatar.Root
      className={`${className} bg-blackA1 inline-flex  select-none items-center justify-center overflow-hidden rounded-full align-middle`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={
          src ??
          "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        }
        alt="Colm Tuite"
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        CT
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AvatarCustom;

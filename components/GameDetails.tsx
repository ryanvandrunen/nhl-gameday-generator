import * as React from "react";
import { GameDetailsProps } from "@/lib/types";
import Image from "next/image";

export const GameDetails: React.FC<GameDetailsProps> = ({
  venue,
  time,
  season,
}) => {
  return (
    <div className="flex flex-col grow text-sm font-bold tracking-widest text-white max-md:mt-2.5">
      <h1 className="text-xl text-center tracking-[10px] max-md:mx-2.5">
        GAMEDAY
      </h1>
      <h2 className="mt-7 text-center font-medium">{venue}</h2>
      <Image
        width={190}
        height={190}
        loading="lazy"
        src="/images/nhl.png"
        alt="NHL logo"
        className="object-contain self-center mt-2 max-w-full aspect-[1.91] w-[190px]"
      />
      <time className="text-center mt-5 font-medium">{time}</time>
      <p className="mx-6 mt-6 text-xs text-center tracking-[2.4px] max-md:mx-2.5">
        {season}
      </p>
    </div>
  );
};

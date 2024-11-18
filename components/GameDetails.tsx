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
      <div className="flex flex-col">
        <h2 className="mt-7 text-center font-medium">{venue}</h2>
        <Image
          crossOrigin="anonymous"
          width={1904}
          height={190}
          src="/images/nhl.png"
          alt="NHL logo"
          className="self-center mt-2 max-w-full aspect-[1.91] w-[190px] h-auto"
        />
        <time className="text-center mt-5 font-medium">{time}</time>
      </div>
      <p className="mx-6 mt-6 text-xs text-center tracking-[2.4px] max-md:mx-2.5">
        {season}
      </p>
    </div>
  );
};

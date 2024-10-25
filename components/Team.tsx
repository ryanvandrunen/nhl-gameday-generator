import * as React from "react";
import { TeamProps } from "@/lib/types";
import Image from "next/image";

export const Team: React.FC<TeamProps> = ({
  record,
  bottomColour,
  topColour,
  logoSrc,
}) => {
  return (
    <div className="flex flex-col grow mt-3 text-sm font-black text-white whitespace-nowrap tracking-[2.8px] max-md:mt-6">
      <div className="flex shrink-0 h-0.5 bg-zinc-300" />
      <div
        className="mt-4"
        style={{
          background: `linear-gradient(to top, ${bottomColour}, ${topColour})`,
        }}
      >
        <Image
          crossOrigin="anonymous"
          width={227}
          height={227}
          src={logoSrc}
          alt="team logo"
          className="max-w-full aspect-[1.08] drop-shadow-lg"
        />
      </div>
      <div className="text-center mt-2">{record}</div>
    </div>
  );
};

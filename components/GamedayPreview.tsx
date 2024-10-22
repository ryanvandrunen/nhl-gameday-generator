"use client";

import { format } from "date-fns";
import Image from "next/image";

interface GamedayPreviewProps {
  data: {
    homeTeam: string;
    awayTeam: string;
    gameDate: Date;
    gameTime: string;
  };
}

export default function GamedayPreview({ data }: GamedayPreviewProps) {
  const { homeTeam, awayTeam, gameDate, gameTime } = data;

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-950 to-zinc-950 p-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=2000')] bg-cover bg-center opacity-10"></div>

      <div className="relative flex h-full flex-col items-center justify-between">
        <div className="text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            NHL Hockey
          </h3>
          <p className="mt-1 text-lg font-medium text-white">
            {format(gameDate, "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-center">
            <div className="relative mb-4 h-32 w-32">
              <Image
                src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${homeTeam}.svg`}
                alt={homeTeam}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-bold text-white">{homeTeam}</h2>
          </div>

          <div className="text-center">
            <div className="rounded-full bg-white/10 px-6 py-2 backdrop-blur">
              <p className="text-2xl font-bold text-white">VS</p>
            </div>
          </div>

          <div className="text-center">
            <div className="relative mb-4 h-32 w-32">
              <Image
                src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${awayTeam}.svg`}
                alt={awayTeam}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-bold text-white">{awayTeam}</h2>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold text-white">{gameTime} ET</p>
          <div className="mt-2 inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300 backdrop-blur">
            Game Time
          </div>
        </div>
      </div>
    </div>
  );
}

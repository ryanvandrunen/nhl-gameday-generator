import * as React from "react";
import { Team } from "./Team";
import { GameDetails } from "./GameDetails";
import { TEAM_COLOURS } from "@/lib/constants";
import { NHLGame } from "@/lib/types";
import { format, parseISO } from "date-fns";
import SplitImage from "./SplitImage";

interface GamedayPreviewProps {
  game: NHLGame;
  awayPlayerImage: string;
  homePlayerImage: string;
  leftLogoUrl: string;
  rightLogoUrl: string;
}

export const GamedayPreview: React.FC<GamedayPreviewProps> = ({
  game,
  awayPlayerImage,
  homePlayerImage,
  leftLogoUrl,
  rightLogoUrl,
}) => {
  return (
    <main className="overflow-hidden flex justify-center max-w-[751px] clip-content">
      <section className="flex flex-col w-full max-md:max-w-full clip-content">
        <SplitImage
          leftImage={awayPlayerImage}
          rightImage={homePlayerImage}
          altLeft={`${game.awayTeam.name.default} player`}
          altRight={`${game.homeTeam.name.default} player`}
        />
        <section className="py-2 w-full bg-zinc-900 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <Team
                logoSrc={leftLogoUrl}
                record={`${game.awayTeam.record}`}
                bottomColour={
                  TEAM_COLOURS[
                    game.awayTeam.abbrev as keyof typeof TEAM_COLOURS
                  ][0]
                }
                topColour={
                  TEAM_COLOURS[
                    game.awayTeam.abbrev as keyof typeof TEAM_COLOURS
                  ][1]
                }
              />
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <GameDetails
                venue={game.venue.default}
                timeSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/316535ecfa44b32f402632d5bd7dd3b1a2ab9960a79cf11618236d49a04dfe49?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309"
                timeAlt="Game time illustration"
                time={`${format(parseISO(game.startTimeUTC), "h:mm a")} ET`}
                season={`${game.season
                  .toString()
                  .substring(0, 4)} - ${game.season
                  .toString()
                  .substring(4)} SEASON`}
              />
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <Team
                logoSrc={rightLogoUrl}
                record={`${game.homeTeam.record}`}
                bottomColour={
                  TEAM_COLOURS[
                    game.homeTeam.abbrev as keyof typeof TEAM_COLOURS
                  ][0]
                }
                topColour={
                  TEAM_COLOURS[
                    game.homeTeam.abbrev as keyof typeof TEAM_COLOURS
                  ][1]
                }
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

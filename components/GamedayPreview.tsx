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
    <div className="overflow-hidden flex justify-center w-full max-w-[751px] clip-content">
      <section
        className="flex flex-col w-full clip-content"
        id="gameday-preview"
      >
        <SplitImage
          leftImage={awayPlayerImage}
          rightImage={homePlayerImage}
          altLeft={`${game.awayTeam.name.default} player`}
          altRight={`${game.homeTeam.name.default} player`}
        />
        <section className="py-2 w-full bg-zinc-900">
          {game.awayTeam.record ? (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <div className="w-full sm:w-[33%]">
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
              <div className="w-full sm:w-[33%]">
                <GameDetails
                  header="GAMEDAY"
                  venue={game.venue.default}
                  time={`${format(parseISO(game.startTimeUTC), "h:mm a")} ET`}
                  season={`${game.season
                    .toString()
                    .substring(0, 4)} - ${game.season
                    .toString()
                    .substring(4)} SEASON`}
                />
              </div>
              <div className="w-full sm:w-[33%]">
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
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <div className="w-full sm:w-[33%]">
                <Team
                  logoSrc={leftLogoUrl}
                  record={`${game.awayTeam.score}`}
                  sog={`${game.awayTeam.sog}`}
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
              <div className="w-full sm:w-[33%]">
                <GameDetails
                  header="SCORE"
                  venue={game.venue.default}
                  time={`${format(parseISO(game.startTimeUTC), "h:mm a")} ET`}
                  season={`${game.season
                    .toString()
                    .substring(0, 4)} - ${game.season
                    .toString()
                    .substring(4)} SEASON`}
                />
              </div>
              <div className="w-full sm:w-[33%]">
                <Team
                  logoSrc={rightLogoUrl}
                  record={`${game.homeTeam.score}`}
                  sog={`${game.homeTeam.sog}`}
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
          )}
        </section>
      </section>
    </div>
  );
};

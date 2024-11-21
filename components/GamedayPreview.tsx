import * as React from "react";
import { Team } from "./Team";
import { GameDetails } from "./GameDetails";
import { TEAM_COLOURS, COLOUR_SWAP } from "@/lib/constants";
import { NHLGame } from "@/lib/types";
import { format, parseISO } from "date-fns";
import SplitImage from "./SplitImage";

interface GamedayPreviewProps {
  game: NHLGame;
  awayPlayerImage: string;
  homePlayerImage: string;
}

export const GamedayPreview: React.FC<GamedayPreviewProps> = ({
  game,
  awayPlayerImage,
  homePlayerImage,
}) => {
  const pickLogo = (abbrev: string) => {
    if (COLOUR_SWAP[abbrev as keyof typeof COLOUR_SWAP]) {
      return COLOUR_SWAP[abbrev as keyof typeof COLOUR_SWAP];
    }
    return null;
  };

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
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
              <Team
                logoSrc={pickLogo(game.awayTeam.abbrev) || game.awayTeam.logo}
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
            <div className="w-full sm:w-1/3 h-full flex items-center justify-center">
              <GameDetails
                venue={game.venue.default}
                time={`${format(parseISO(game.startTimeUTC), "h:mm a")} ET`}
                season={`${game.season
                  .toString()
                  .substring(0, 4)} - ${game.season
                  .toString()
                  .substring(4)} SEASON`}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <Team
                logoSrc={pickLogo(game.homeTeam.abbrev) || game.homeTeam.logo}
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
    </div>
  );
};

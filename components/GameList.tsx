"use client";

import { useEffect, useState, useRef } from "react";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { NHLGame } from "@/lib/types";
import { GamedayPreview } from "@/components/GamedayPreview";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { storage } from "@/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { TEAM_COLOURS } from "@/lib/constants";

const GameList = () => {
  const [games, setGames] = useState<NHLGame[]>([]);
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({});
  const [playerImages, setPlayerImages] = useState<Record<string, string[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<NHLGame | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchGames(),
          preloadLogos(),
          preloadPlayerImages(),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchGames = async () => {
    const response = await fetch("/api/nhl-scores");
    const data = await response.json();
    setGames(data.games || []);
  };

  const preloadLogos = async () => {
    const logosRef = ref(storage, "logos");
    const result: Record<string, string> = {};
    const teamAbbreviations = Object.keys(TEAM_COLOURS);

    await Promise.all(
      teamAbbreviations.map(async (abbrev) => {
        const logoRef = ref(logosRef, `${abbrev}.svg`);
        const url = await getDownloadURL(logoRef);
        result[abbrev] = url;
      })
    );

    setLogoUrls(result);
  };

  const preloadPlayerImages = async () => {
    const playersRef = ref(storage, "players");
    const result: Record<string, string[]> = {};
    const teamAbbreviations = Object.keys(TEAM_COLOURS);

    await Promise.all(
      teamAbbreviations.map(async (abbrev) => {
        const teamPlayersRef = ref(playersRef, abbrev);
        const playersList = await listAll(teamPlayersRef);
        const playerUrls = await Promise.all(
          playersList.items.map((item) => getDownloadURL(item))
        );
        result[abbrev] = playerUrls;
      })
    );

    setPlayerImages(result);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  }

  if (games.length === 0) {
    return <NoGamesState />;
  }

  return (
    <div className="space-y-8">
      <GamesTable games={games} onSelectGame={setSelectedGame} />

      {selectedGame && (
        <GamePreview
          game={selectedGame}
          playerImages={playerImages}
          logoUrls={logoUrls}
        />
      )}
    </div>
  );
};

const LoadingState = () => (
  <div className="flex h-64 items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

const ErrorState = ({
  error,

  onRetry,
}: {
  error: string;

  onRetry: () => void;
}) => (
  <div className="flex h-64 flex-col items-center justify-center gap-4">
    <p className="text-red-300">{error}</p>

    <Button onClick={onRetry} variant="outline" className="">
      Try Again
    </Button>
  </div>
);

const NoGamesState = () => (
  <div className="flex h-64 items-center justify-center">
    <p className="">No games scheduled for today.</p>
  </div>
);

const GamesTable = ({
  games,

  onSelectGame,
}: {
  games: NHLGame[];

  onSelectGame: (game: NHLGame) => void;
}) => (
  <Table>
    <TableHeader>
      <TableRow className="border-b border-slate-600">
        <TableHead className="font-bold">Time (ET)</TableHead>

        <TableHead className="font-bold">Matchup</TableHead>

        <TableHead className="font-bold">Venue</TableHead>

        <TableHead className="text-right font-bold"></TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {games.map((game) => (
        <TableRow key={game.id} className="border-b">
          <TableCell className="font-medium">
            {format(parseISO(game.startTimeUTC), "h:mm a")}
          </TableCell>

          <TableCell className="">
            {game.awayTeam.name.default} @ {game.homeTeam.name.default}
          </TableCell>

          <TableCell className="">{game.venue.default}</TableCell>

          <TableCell className="text-right">
            <Button
              variant="outline"
              onClick={() => onSelectGame(game)}
              className="bg-black text-white hover:text-white hover:bg-stone-700"
            >
              Generate Graphic
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const GamePreview = ({
  game,
  playerImages,
  logoUrls,
}: {
  game: NHLGame;
  playerImages: Record<string, string[]>;
  logoUrls: Record<string, string>;
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // doesnt work
    return;
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={previewRef} className="w-full max-w-[751px] overflow-hidden">
        <GamedayPreview
          game={game}
          awayPlayerImage={
            playerImages[game.awayTeam.abbrev][
              Math.floor(
                Math.random() * playerImages[game.awayTeam.abbrev].length
              )
            ] || ""
          }
          homePlayerImage={
            playerImages[game.homeTeam.abbrev][
              Math.floor(
                Math.random() * playerImages[game.homeTeam.abbrev].length
              )
            ] || ""
          }
          leftLogoUrl={logoUrls[game.awayTeam.abbrev] || ""}
          rightLogoUrl={logoUrls[game.homeTeam.abbrev] || ""}
        />
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        className="mt-4 bg-black text-white hover:text-white hover:bg-stone-700"
      >
        Download as JPG
      </Button>
    </div>
  );
};

export default GameList;

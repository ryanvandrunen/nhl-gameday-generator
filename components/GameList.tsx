"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
import { toPng } from "html-to-image";

const GameList = () => {
  const [games, setGames] = useState<NHLGame[]>([]);
  const [playerImages, setPlayerImages] = useState<Record<string, string[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<NHLGame | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchGames(), preloadPlayerImages()]);
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
    <div className="space-y-4 sm:space-y-8">
      <GamesTable games={games} onSelectGame={setSelectedGame} />

      {selectedGame && (
        <GamePreview game={selectedGame} playerImages={playerImages} />
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
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow className="border-b border-slate-600">
          <TableHead className="font-bold">Time (ET)</TableHead>
          <TableHead className="font-bold">Matchup</TableHead>
          <TableHead className="font-bold hidden sm:table-cell">
            Venue
          </TableHead>
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
            <TableCell className="hidden sm:table-cell">
              {game.venue.default}
            </TableCell>
            <TableCell className="text-right">
              {game.awayTeam.record ? (
                <Button
                  variant="outline"
                  onClick={() => onSelectGame(game)}
                  className="bg-black text-white hover:text-white hover:bg-stone-700 text-xs sm:text-sm"
                >
                  Generate
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="bg-black text-white hover:text-white hover:bg-stone-700 text-xs sm:text-sm"
                >
                  Unavailable
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const GamePreview = ({
  game,
  playerImages,
}: {
  game: NHLGame;
  playerImages: Record<string, string[]>;
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    if (previewRef.current === null) {
      return;
    }

    toPng(previewRef.current, { includeQueryParams: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `gameday-preview-${game.id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  }, [game.id]);

  const proxyUrl = (url: string) =>
    `/api/proxy-image?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-[751px] overflow-hidden drop-shadow-md"
        ref={previewRef}
      >
        <GamedayPreview
          game={game}
          awayPlayerImage={proxyUrl(
            playerImages[game.awayTeam.abbrev][
              Math.floor(
                Math.random() * playerImages[game.awayTeam.abbrev].length
              )
            ] || ""
          )}
          homePlayerImage={proxyUrl(
            playerImages[game.homeTeam.abbrev][
              Math.floor(
                Math.random() * playerImages[game.homeTeam.abbrev].length
              )
            ] || ""
          )}
        />
      </div>
      <Button
        onClick={handleDownload}
        variant="outline"
        className="mt-4 bg-black text-white hover:text-white hover:bg-stone-700"
      >
        Download as PNG
      </Button>
    </div>
  );
};

export default GameList;

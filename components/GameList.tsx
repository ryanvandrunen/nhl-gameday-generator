"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { NHLGame } from "@/lib/types";
import GamedayPreview from "@/components/GamedayPreview";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GameList = () => {
  const [games, setGames] = useState<NHLGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<NHLGame | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/score/now"
      );
      const data = await response.json();
      setGames(data.games || []);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch games");
      setLoading(false);
    }
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
      {selectedGame && <GamePreview game={selectedGame} />}
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

const GamePreview = ({ game }: { game: NHLGame }) => (
  <div className="relative aspect-video w-full overflow-hidden rounded-lg border backdrop-blur-sm">
    <GamedayPreview
      data={{
        homeTeam: game.homeTeam.abbrev,
        awayTeam: game.awayTeam.abbrev,
        gameDate: parseISO(game.startTimeUTC),
        gameTime: format(parseISO(game.startTimeUTC), "h:mm a"),
      }}
    />
  </div>
);

export default GameList;

"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { NHLGame, NHLScoreResponse } from "@/lib/types";
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

export function GameList() {
  const [games, setGames] = useState<NHLGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<NHLGame | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("https://api-web.nhle.com/v1/score/now");
        if (!response.ok) throw new Error("Failed to fetch games");

        const data: NHLScoreResponse = await response.json();
        setGames(data.todayGames || []);
      } catch (err) {
        setError("Failed to load today's games. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-zinc-400">No games scheduled for today.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time (ET)</TableHead>
            <TableHead>Matchup</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">
                {format(parseISO(game.startTimeUTC), "h:mm a")}
              </TableCell>
              <TableCell>
                {game.awayTeam.name.default} @ {game.homeTeam.name.default}
              </TableCell>
              <TableCell>{game.venue.default}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" onClick={() => setSelectedGame(game)}>
                  Generate Graphic
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedGame && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
          <GamedayPreview
            data={{
              homeTeam: selectedGame.homeTeam.abbrev,
              awayTeam: selectedGame.awayTeam.abbrev,
              gameDate: parseISO(selectedGame.startTimeUTC),
              gameTime: format(parseISO(selectedGame.startTimeUTC), "h:mm a"),
            }}
          />
        </div>
      )}
    </div>
  );
}

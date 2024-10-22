import { GameList } from "../components/GameList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            NHL Gameday Graphics
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Generate graphics for today's NHL games
          </p>
        </div>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Today's Games</CardTitle>
            <CardDescription>
              Select a game to generate a gameday graphic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GameList />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

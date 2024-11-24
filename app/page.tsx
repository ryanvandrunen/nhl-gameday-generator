import GameList from "../components/GameList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-black to-[#909090] bg-clip-text text-transparent pb-2">
            NHL Gameday Graphics
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            Generate graphics for today&apos;s NHL games
          </p>
        </header>

        <Card className="bg-white/10 backdrop-blur-lg shadow-2xl bg-dots">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Today&apos;s Games ({formattedDate})
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
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

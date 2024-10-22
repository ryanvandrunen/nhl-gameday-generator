import GameList from "../components/GameList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-black to-[#909090] bg-clip-text text-transparent pb-2">
            NHL Gameday Graphics
          </h1>
          <p className="mt-4 text-lg">
            Generate graphics for today's NHL games
          </p>
        </header>

        <Card className="bg-white/10 backdrop-blur-lg shadow-2xl bg-dots">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Today's Games</CardTitle>
            <CardDescription className="">
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

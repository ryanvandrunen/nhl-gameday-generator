"use client";

import { useState, useEffect } from "react";
import GameList from "../components/GameList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLocalDate } from "@/lib/utils";

export default function Home() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const getLocalDate = () => {
      const easternTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const [month, day, year] = easternTime.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    setFormattedDate(getLocalDate());
  }, []);

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

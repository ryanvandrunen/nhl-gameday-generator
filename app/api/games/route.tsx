import { NextResponse } from "next/server";
import axios from "axios";
import { NHLScoreResponse } from "@/lib/types";

export async function GET() {
  try {
    const { data } = await axios.get<NHLScoreResponse>(
      "https://api-web.nhle.com/v1/score/now"
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching NHL games:", error);
    return NextResponse.json(
      { error: "Failed to fetch NHL games" },
      { status: 500 }
    );
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    res.setHeader("Content-Type", contentType || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=3600");

    response.body.pipe(res);
  } catch (error) {
    console.error("Error proxying image:", error);
    res.status(500).json({ error: "Failed to proxy image" });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  try {
    const response = await fetch(`https://api-web.nhle.com/v1/score/${formattedDate}`);
    var data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch NHL scores", error);
    res.status(500).json({ error: "Failed to fetch NHL scores" });
  }
}



// @ts-nocheck
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const apiKey = process.env.WEATHER_API_KEY;
    // const lat = 26.9124;
    // const lon = 75.7873;

    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollusion data ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}

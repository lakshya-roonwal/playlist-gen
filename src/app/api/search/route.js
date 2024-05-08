import { spotifyApi, getAccessToken } from '../../../lib/spotify';
import { NextRequest, NextResponse } from "next/server";


export async function POST(NextRequest) {
    try {
        const body = await NextRequest.json();
  const  query  = body.query; // Get search query from request

    await getAccessToken(); // Ensure access token is set
    const result = await spotifyApi.searchTracks(query, { limit: 10 });
    return NextResponse.json({ msg: "Sucess",data:result.body.tracks.items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: `${error}` });
  }
}
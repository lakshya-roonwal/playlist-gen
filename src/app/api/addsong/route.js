import { connect } from "@/dbConfig/dbConfig";
import Song from "@/models/Song";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req) {
    try {
        const { name, artists, image ,addedBy,spotifyId,spotifyURI } = await req.json();
    
        // Basic validation to ensure required fields are provided
        if (!name || !artists || !image || !addedBy || !spotifyId ||!spotifyURI) {
          return NextResponse.json({ error: 'Please provide name, artist, and image.' });
        }
    
        // Create a new song document
        const newSong = new Song({
          name,
          artists,
          image,
          addedBy,
          spotifyURI,
          spotifyId,
          votes: 0, // Default vote count
          upvotedBy: [], // Empty initially
          downvotedBy: [], // Empty initially
        });
    
        // Save the new song to the database
        const savedSong = await newSong.save();

        const { upvotedBy, downvotedBy, ...filteredSong } = savedSong.toObject(); // Exclude sensitive fields
    
        return NextResponse.json({msg:"Success",savedSong:filteredSong}); // Respond with the saved song
      } catch (error) {
        console.error('Error adding song:', error);
        return NextResponse.json({ error: 'An error occurred while adding the song.' });
      }
}
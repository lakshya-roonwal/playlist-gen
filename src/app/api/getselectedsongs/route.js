import { connect } from "@/dbConfig/dbConfig";
import Song from "@/models/Song";
import { currentUser } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req) {
  const user = await currentUser();
  const userId=user.id;
  try {
    // Fetch all songs but exclude `upvotedBy` and `downvotedBy`
    const songs = await Song.find({}); // Fetch all songs

    // Map over each song and determine whether it is upvoted or downvoted by the specified user
    const songsWithVoteStatus = songs.map((song) => {
      const isUpvoted = song.upvotedBy.includes(userId);
      const isDownvoted = song.downvotedBy.includes(userId);

      const songData = {
        ...song.toObject(), // Convert the Mongoose document to a plain object
        isUpvoted, // Add the user's upvote status
        isDownvoted, // Add the user's downvote status
      };

      // Exclude sensitive fields from the returned data
      const { upvotedBy, downvotedBy, ...safeSongData } = songData;

      return safeSongData;
    });

    return NextResponse.json({ msg: "Success", songs: songsWithVoteStatus }); // Return the list of songs
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json({
      error: "An error occurred while fetching songs.",
    });
  }
}

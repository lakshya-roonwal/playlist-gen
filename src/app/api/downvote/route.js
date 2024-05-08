import { connect } from "@/dbConfig/dbConfig";
import Song from "@/models/Song";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const { userId, songId } = await req.json(); // Obtain the user ID from the request

    const song = await Song.findById(songId);

    if (!song) {
      return NextResponse.json({ error: "Song not found" });
    }

    if (song.downvotedBy.includes(userId)) {
      return NextResponse.json({
        error: "User has already downvoted this song",
      });
    }

    if (song.upvotedBy.includes(userId)) {
      // If the user has upvoted, remove them from upvotedBy and decrease the votes count
      song.upvotedBy = song.upvotedBy.filter((id) => id !== userId);
      song.votes -= 1; // Neutralize the previous upvote
    }

    song.downvotedBy.push(userId);
    song.votes -= 1; // Decrement the votes count

    const updatedVoteSong = await song.save(); // Save the updated song

    // Create an object to represent the song with additional fields indicating the user's vote status
    const updatedSongWithVoteStatus = {
      ...song.toObject(),
      isUpvoted: song.upvotedBy.includes(userId),
      isDownvoted: song.downvotedBy.includes(userId),
    };

    // Destructure the sensitive fields from the updated song object to prevent sending them to the client
    const { upvotedBy, downvotedBy, ...safeUpdatedSong } =
      updatedVoteSong.toObject();

    // Return the updated song with additional vote status information
    return NextResponse.json({
      ...safeUpdatedSong,
      isUpvoted: updatedSongWithVoteStatus.isUpvoted,
      isDownvoted: updatedSongWithVoteStatus.isDownvoted,
    });
  } catch (error) {
    console.error("Error downvoting song:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

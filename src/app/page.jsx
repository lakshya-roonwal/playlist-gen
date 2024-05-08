"use client";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import SelectedSongs from "@/components/SelectedSongs";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";

export default function Home() {

  const { toast } = useToast()
  const {user} = useUser();
  const [selectedSongs, setSelectedSongs] = useState([]); // State for selected songs
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To track errors during fetch
  console.log(selectedSongs)
  useEffect(() => {
    if (user) {
      const fetchSelectedSongs = async () => {
        try {
          setLoading(true); // Start loading
          const response = await axios.get("/api/getselectedsongs", {
            params: { userId: user.id }, // Use `params` to send the userId
          });
          if (response.status !== 200) {
            throw new Error("Failed to fetch selected songs");
          }
          setSelectedSongs(response.data.songs); // Set the fetched data
        } catch (error) {
          setError(error.message); // Set the error message
        } finally {
          setLoading(false); // End loading
        }
      };
  
      fetchSelectedSongs(); // Call the function to fetch data
    }
  }, [user]);

  const addToSelectedSongs = async (newTrack) => {
    const isAlreadyPresent = selectedSongs.some(
      (song) => song.spotifyId === newTrack.id // Compare by ID
    );
  
    if (isAlreadyPresent) {
      toast({
        variant: "destructive",
        title: "Song Already Exist",
        description: "The Current Song already exits in the playlist",
      })
      return; // Early exit if the song is already selected
    }
  
    const addedTrack = {
      name: newTrack.name,
      artists: newTrack.artists,
      spotifyId:newTrack.id,
      image: newTrack.album.images[0].url,
      votes: 0,
      addedBy: user.id,
      spotifyURI:newTrack.uri
    };

  
    try {
      // Send POST request to add the song to the backend
      const response = await axios.post('/api/addsong', {
        name: addedTrack.name,
        artists: addedTrack.artists.map((artist) => artist.name).join(', '),
        image: addedTrack.image,
        votes: addedTrack.votes,
        addedBy:addedTrack.addedBy,
        spotifyId:addedTrack.spotifyId,
        spotifyURI:addedTrack.spotifyURI
      });
  
      const savedSong = response.data.savedSong; // The created song from the response
  
      // Add the saved song to the local state
      setSelectedSongs((prevSongs) => [...prevSongs, savedSong ]);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  // Function to upvote a song
  const handleUpvote = async(songId) => {
    try {
      // Send a PUT request to the backend to downvote a song
      const response = await axios.post('/api/upvote', {
        songId,
        userId:user.id, // Include the user ID in the request body
      });
  
      const updatedSong = response.data; // Get the updated song from the response
  
      // Update the selectedSongs state with the updated song
      setSelectedSongs((prevSongs) =>
        prevSongs.map((song) =>
          song._id === songId ? { ...song, ...updatedSong } : song
        )
      );
    } catch (error) {
      console.error('Error downvoting song:', error); // Handle errors
    }
  };

  // Function to handle downvote on the client-side
const handleDownvote = async (songId,) => {
  try {
    // Send a PUT request to the backend to downvote a song
    const response = await axios.post('/api/downvote', {
      songId,
      userId:user.id, // Include the user ID in the request body
    });

    const updatedSong = response.data; // Get the updated song from the response

    // Update the selectedSongs state with the updated song
    setSelectedSongs((prevSongs) =>
      prevSongs.map((song) =>
        song._id === songId ? { ...song, ...updatedSong } : song
      )
    );
  } catch (error) {
    console.error('Error downvoting song:', error); // Handle errors
  }
};
  return (
    <main className="flex min-h-screen flex-col items-center px-24 p-4">
      <SignedIn>
      <h1 className="text-3xl font-bold">Public Coding Playlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
        {/* Added Songs */}
        <SelectedSongs
          loading={loading}
          error={error}
          selectedSongs={selectedSongs}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
        <Search addToSelectedSongs={addToSelectedSongs} />
      </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <Toaster/>
    </main>
  );
}

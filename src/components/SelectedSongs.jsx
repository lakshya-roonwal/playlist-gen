"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import VoteButton from "./VoteButton";
import { ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";

const SelectedSongs = ({
  selectedSongs,
  handleUpvote,
  handleDownvote, 
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Selected Songs</h2>

        <div className="flex items-center gap-4 animate-pulse">
          <div className="rounded-md bg-gray-200 dark:bg-gray-800 w-20 h-20" />
          <div className="flex-1 space-y-2">
            <div className="bg-gray-200 dark:bg-gray-800 h-5 w-3/4 rounded" />
            <div className="bg-gray-200 dark:bg-gray-800 h-4 w-1/2 rounded" />
          </div>
        </div>
      </div>
    ); // Show a Skeleton loading while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  const [sortBy, setSortBy] = useState("votes")
  const [filteredSongs, setFilteredSongs] = useState(selectedSongs);

  useEffect(()=>{
    setFilteredSongs(selectedSongs)
  },[selectedSongs])

  useEffect(() => {
    let sortedSongs;

    if (sortBy === 'votes') {
      // Sort by votes (highest to lowest)
      sortedSongs = [...filteredSongs].sort((a, b) => b.votes - a.votes);
    } else if (sortBy === 'alphabetical') {
      // Sort alphabetically by name
      sortedSongs = [...filteredSongs].sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortBy === 'chronological') {
      // Sort alphabetically by name
      sortedSongs = selectedSongs;
    }

    // If you have time-based sorting, you can add it here
    // e.g., `else if (sortCriteria === 'time') { ... }`

    setFilteredSongs(sortedSongs);
  }, [sortBy]);
  

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Selected Songs</h2>
      <div>

      <div>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              Sort By
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="votes">Most Votes</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="chronological">Chronological</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="alphabetical">Alphabetical</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <ScrollArea className="grid gap-2 h-[30rem]">
        {filteredSongs?.map((track) => (
          <div
            key={track._id}
            className="flex items-center gap-4 my-4 shadow-sm"
          >
            <img
              alt="Song Image"
              className="rounded-md"
              height={80}
              src={track.image}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{track.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {track.artists.map((artist) => artist).join(", ")}
              </p>
            </div>
            <VoteButton
              handleUpvote={handleUpvote}
              handleDownvote={handleDownvote}
              track={track}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default SelectedSongs;

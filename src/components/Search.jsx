"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Search = ({ addToSelectedSongs }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // To track errors

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Reset error state before making the request

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Send the search query as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data.data); // Set the search results
    } catch (err) {
      setError(err.message); // Set error message if there's an exception
    } finally {
      setIsLoading(false); // Stop loading in any case
    }
  };

  return (
    <>
      {/* Search Songs Component */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Add Songs</h2>
        <div className="flex gap-2">
          <form
            onSubmit={handleSearch}
            className="w-full flex gap-2 items-center"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              placeholder="Search for a song..."
              type="search"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="rounded-md bg-gray-200 dark:bg-gray-800 w-20 h-20" />
            <div className="flex-1 space-y-2">
              <div className="bg-gray-200 dark:bg-gray-800 h-5 w-3/4 rounded" />
              <div className="bg-gray-200 dark:bg-gray-800 h-4 w-1/2 rounded" />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center">
            {error} {/* Display error message */}
          </div>
        )}

        

        {/* Search Results */}
        <ScrollArea className="grid gap-4 h-[30rem]">
          {!isLoading &&
            results.map((track) => (
              <div
                key={track.id}
                className="flex items-center my-2 gap-4 bg-white rounded-lg shadow-sm p-4 dark:bg-gray-950"
              >
                <img
                  className="rounded-md"
                  height={80}
                  src={track.album.images[0].url} // Use the first image (usually the largest)
                  alt={`Album art for ${track.name}`}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width={80}
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{track.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    addToSelectedSongs(track);
                  }}
                >
                  Add
                </Button>
              </div>
            ))}
        </ScrollArea>

      </div>
    </>
  );
};

export default Search;

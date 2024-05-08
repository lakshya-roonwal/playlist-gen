import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ArrowBigUp,ArrowBigDown } from 'lucide-react';

import { Button } from "./ui/button";

const VoteButton = ({ handleDownvote, handleUpvote, track }) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        className="text-green-500"
        size="icon"
        variant="ghost"
        onClick={() => handleUpvote(track._id)}
      >
        <ArrowBigUp fill={track.isUpvoted?"#22C55E":"#fff"} stroke="#22C55E" className="w-5 h-5" />
      </Button>
      <span className="text-lg font-medium">{track.votes}</span>
      <Button
        className="text-red-500"
        size="icon"
        variant="ghost"
        onClick={() => handleDownvote(track._id)}
      >
        <ArrowBigDown fill={track.isDownvoted?"#EF4444":"#fff"} stroke="#EF4444" className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default VoteButton;

const mongoose = require('mongoose');

// Modify the song schema to include upvote and downvote tracking
const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
  spotifyURI: {
    type: String,
    required: true,
  },
  spotifyId: {
    type: String,
    required: true,
  },
  artists: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  upvotedBy: {
    type: [String], // Array of user IDs who upvoted
    default: [],
  },
  downvotedBy: {
    type: [String], // Array of user IDs who downvoted
    default: [],
  },
});

const Song = mongoose.models.Song || mongoose.model('Song', songSchema);

module.exports = Song;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scraperSchema = new Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
    bio: {
      type: String,
    },
    followerCount: {
      type: Number,
    },
    connectionCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

//creating a model

const scraper = mongoose.model("linkedIn", scraperSchema);
module.exports = scraper;

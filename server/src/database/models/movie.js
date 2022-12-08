// load mongoose since we need it to define a model
import mongoose from "mongoose";
var Schema = mongoose.Schema;
const MovieSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  countries: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: { wins: Number, nominations: Number, text: String },
  lastupdated: String,
  Year: Number,
  imdb: { rating: Number, votes: Number, id: Number },
  type: String,
  tomatoes: {
    viewer: { rating: Number, numReviews: Number, meter: Number },
    lastUpdated: Date,
  },
});
export default mongoose.model("Movie", MovieSchema);

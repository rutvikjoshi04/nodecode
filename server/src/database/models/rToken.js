// load mongoose since we need it to define a model
import mongoose from "mongoose";
var Schema = mongoose.Schema;
const RTokenSchema = new Schema({
  refreshToken: String,
});
export default mongoose.model("RToken", RTokenSchema);

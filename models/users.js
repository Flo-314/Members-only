const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, required: true, maxLength: 75 },
  password: { type: String, required: true },
  name: { type: String, required: true },
  member_status: { type: String, required: true },
  username: { type: String, required: true },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
});

module.exports = mongoose.model("user", userSchema);

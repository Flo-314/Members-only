const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let msgSchema = new Schema({
    title: { type: String, required: true, maxLength: 75 },
    content: { type: String, required: true},
    timestamp: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user",  required: true },
  });
  
module.exports = mongoose.model("message", msgSchema);

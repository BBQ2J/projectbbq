const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const eventSchema = new Schema(
  {
    title: String,
    content: String,
    date: { type: Date, min: Date.now },
    location: String,
    creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
    picName: String,
    picPath: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
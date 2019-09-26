const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const eventSchema = new Schema(
  {
    title: String,
    content: String,
    address: String,
    locality: String,
    city: String,
    postalcode: Number,
    state: String,
    date: Date,
    location: String,
    creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
    picPath: {
      type: String,
      default: "https://static.wixstatic.com/media/7b9a77_b8f71c5a299044a4b11302cbaa4c15dd~mv2.jpg/v1/fit/w_1024,h_683,al_c,q_80/file.png"
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
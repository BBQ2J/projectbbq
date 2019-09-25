const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: String,
    authorId:  { type : Schema.Types.ObjectId, ref: 'User' },
    eventId: { type : Schema.Types.ObjectId, ref: 'Event' },
    picName: String,
    picPath: String,
    createdAt: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
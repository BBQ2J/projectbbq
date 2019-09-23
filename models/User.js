const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const PASSWORD_PATTERN = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true
      // match: [PASSWORD_PATTERN, "this is not a correct password"]
    },
    email: {
      type: String,
      // unique: true,
      required: true,
      lowercase: true,
      trim: true
      // match: [EMAIL_PATTERN, "this is not a correct email"]
    },
    name: String,
    surname: String,
    photo: { 
      url: String, 
      name: String,
      // default: 'http://www.jbhasteam.com/sites/default/files/default-user.png'
     },
    location: String,
    bio: String,
    // interests: {type: String},
    validationCode: { type: String },
    active: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

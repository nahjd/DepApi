const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    surname: String,
    email: String,
    password: String,
    isPublic: Boolean,
    posts: Array,
    follower: Array,
    following: Array,
    blockList: Array,
    stories: Array,
    notifications: Array,
    bio: Object,
    id: String,
  },
  {
    collection: "MyUsers",
    timestamp: true,
  }
);

const User = mongoose.model("MyUsers", userSchema);

module.exports = User;

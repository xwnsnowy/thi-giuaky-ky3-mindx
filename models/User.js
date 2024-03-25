import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  interests: {
    type: [String],
    default: [],
  },
  goals: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("User", userSchema);

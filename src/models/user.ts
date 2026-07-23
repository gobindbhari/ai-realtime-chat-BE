import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    image: String,

    isPremium: {
      type: Boolean,
      default: false
    }
  },  
  {
    timestamps: true,
     collection: "user",
  }
);

const User = mongoose.model("User", UserSchema);

export default User
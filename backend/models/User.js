import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // Technically, we could also put in the password length requirement here. Which I'm going to do, actually.
  password: {
    minlength: 10,
    type: String,
    required: true,
  },
})

export const User = mongoose.model("User", userSchema)

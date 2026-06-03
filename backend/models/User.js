import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      // Basic regex for password complexity.
      validator: value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value),
      message: "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number."
    }
  },
})
export const User = mongoose.model("User", userSchema)

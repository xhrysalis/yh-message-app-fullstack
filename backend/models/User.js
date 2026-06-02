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
  //Things actually changed.
  //Technically, we could also put in the password length requirement here. Which I'm going to do, actually.
  password: {
    minlength: 8,
    type: String,
    required: true,
    //Added validation for password complexity.
    validate: {
    validator: value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/.test(value),
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number."
  }
  },
})

export const User = mongoose.model("User", userSchema)

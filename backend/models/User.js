import mongoose from "mongoose"
import bcrypt from "bcrypt"

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

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
  },
})

userSchema.pre("validate", function (next) {
  if (!this.isModified("password")) return next()

  if (!passwordRegex.test(this.password)) {
    this.invalidate(
      "password",
      "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number."
    )
  }

  next()
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

export const User = mongoose.model("User", userSchema)

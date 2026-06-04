import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    //Message content should be validated before saving, as a last line of defense against malicious input.
    //type: String doesn't actually check that the incoming message is a string, just how it should be stored.
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Message = mongoose.model("Message", messageSchema)

import { Schema } from "mongoose";

const responseSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  user_agent: {
    type: String,
    required: true
  },
  params: {
    type: Schema.Types.Mixed,
    default: null
  },
  query: {
    type: Schema.Types.Mixed,
    default: null
  },
  body: {
    type: Schema.Types.Mixed,
    default: null
  },
  username: {
    type: String,
    default: null
  },
  error_message: {
    type: String,
    default: null
  },
  date: {
    type: String,
    required: true
  }
})

export default responseSchema
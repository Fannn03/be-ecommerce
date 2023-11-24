import mongoose, { Schema } from "mongoose";

const responseSchema = new Schema({
  url: String,
  method: {
    type: String,
    enum: ['get', 'post', 'put', 'patch', 'delete']
  },
  type: {
    type: String,
    enum: ['success', 'bad request', 'unauthorized', 'forbidden', 'internal server error']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default responseSchema
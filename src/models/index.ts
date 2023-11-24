import mongoose from "mongoose";
import responseSchema from "./response-schema";

const Response = mongoose.model('responses', responseSchema);

export const models = {
  response: Response
}
import mongoose, { Document, Model, Schema } from "mongoose";

import { ISession } from "../entities/session-interface.model";
import { v4 as uuidv4 } from "uuid";

const sessionSchema = new Schema<ISession>(
  {
    _id: { type: String, default: uuidv4 },
    pitchId: { type: String, ref: "Pitch", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    depositPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isBooked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const sessionModel = mongoose.model("Sessions", sessionSchema);
export default sessionModel;
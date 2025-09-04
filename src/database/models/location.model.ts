import { Schema } from "mongoose";

const locationSchema = new Schema({

  city: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },

  // GeoJSON koordinatları (MongoDB geo sorguları için)
  geo: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

// 2dsphere index ekliyoruz ki geo sorgular çalışsın
locationSchema.index({ geo: "2dsphere" });

export default locationSchema;
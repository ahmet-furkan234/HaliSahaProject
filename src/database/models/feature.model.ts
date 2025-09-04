import mongoose, { Model, Schema } from "mongoose";

import { IFeature } from "../entities/feature-interface.model";
import { v4 } from "uuid";

const featureSchema: mongoose.Schema<IFeature> = new Schema({
    _id: { type: String, default: v4 },
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const featureModel = mongoose.model("Features", featureSchema);
export default featureModel;


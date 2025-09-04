import mongoose, { Schema } from "mongoose";

import { IFacility } from "../entities/facility.interface.model.js";
import locationSchema from "./location.model.js";
import { v4 } from "uuid";

const facilitySchema: mongoose.Schema<IFacility> = new Schema<IFacility>(
    {
        _id: { type: String, default: v4 },
        name: { type: String, required: true , unique : true },
        description: { type: String },
        location: { type: locationSchema, required: true },
        contacts: {
            phone: [{ type: String, required: true }], // string veya string[]
            email: { type: String, required: true },
            website: { type: String },
            socialMedia: {
                facebook: { type: String },
                instagram: { type: String },
                twitter: { type: String },
            },
        },

        rating: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0, min: 0 },
        },

        coverImage: { type: String, required: true },
        images: [{ type: String }],
        features: [{ type: String, ref: "Features" }],
    },
    { timestamps: true }
);


const facilityModel = mongoose.model("Facilities", facilitySchema);
export default facilityModel;

import mongoose, { Model, Schema } from "mongoose";

import { IPitch } from "../entities/pitch-interface.model";
import { v4 } from "uuid";

const pitchSchema: mongoose.Schema<IPitch> = new Schema({
    _id: { type: String, default: v4 },
    name: { type: String, required: true, unique: true },
    description : {type: String, required: false},
    width : {type : Number, required : true},
    length : {type : Number, required : true},
    dimensionType : {type : String , required : true},
    hasStand : {type : Boolean, required : true},
    coverImage : {type : String , required : true},
    images : [{ type: String, required: true }],
    maxPlayers : {type : Number, required : true},
    type : {type : String , required : true},
    facilityId : {type : String, ref : "Facilities" , required : true}
}, { timestamps: true });

const pitchModel = mongoose.model("Pitchs", pitchSchema);
export default pitchModel;
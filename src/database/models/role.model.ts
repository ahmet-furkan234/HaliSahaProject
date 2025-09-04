import mongoose, { Model, Schema } from "mongoose";

import { IRole } from "../entities/role-interface.model";
import { v4 } from "uuid";

const roleSchema: mongoose.Schema<IRole> = new Schema({
    _id: { type: String, default: v4 },
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const roleModel = mongoose.model("Roles", roleSchema);
export default roleModel;
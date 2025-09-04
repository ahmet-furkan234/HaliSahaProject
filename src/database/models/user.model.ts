import mongoose, { Model, Schema } from "mongoose";

import { IUser } from "../entities/user-interface.model";
import { v4 } from "uuid";

export const userSchema: mongoose.Schema<IUser> = new Schema({
    _id: { type: String, default: v4 },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    roleId: { type: String, ref: "Roles" }
}, { timestamps: true });

const userModel = mongoose.model("Users", userSchema);
export default userModel;

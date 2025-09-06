import { IRole } from "../entities/role-interface.model";
import mongoose from "mongoose";
import { v4 } from "uuid";

const roleSchema : mongoose.Schema<IRole> = new mongoose.Schema({
    _id : {type : String, default : v4},
    name : {type : String , required : true , unique : true}
},{timestamps : true});

const roleModel = mongoose.model("Roles", roleSchema);
export default roleModel;
import { IRole } from "./role-interface.model";

export interface IUser {
    _id : string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    roleId : IRole;
    refreshToken : string
}

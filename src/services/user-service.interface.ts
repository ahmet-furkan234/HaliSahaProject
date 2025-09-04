import { CreateUserDto, UpdateUserDto, UserDto } from "../dtos/user.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";

export interface IUserService {
    createUser(createUserDto: CreateUserDto): Promise<IGenericResponse<UserDto>>;
    getUsers(): Promise<IGenericResponse<UserDto[]>>;
    getUserByEmail(email: string) : Promise<IGenericResponse<UserDto>>;
    getUserById(userId: string): Promise<IGenericResponse<UserDto>>;
    getUsersByRoleId(roleId: string): Promise<IGenericResponse<UserDto[]>>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IGenericResponse<UserDto>>;
    deleteUser(userId: string): Promise<IGenericResponse<UserDto>>;
}
import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreateUserDto, UpdateUserDto, UserDto } from "../dtos/user.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";
import type { IUserService } from "./user-service.interface.js";
import UserModel from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import { buildUpdateQuery } from "../utils/updateQueryBuilder.js";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import userModel from "../database/models/user.model.js";

@injectable()
export class UserService implements IUserService {

    private userModel: typeof UserModel;
    constructor() {
        this.userModel = userModel;
    }
    async createUser(createUserDto: CreateUserDto): Promise<IGenericResponse<UserDto>> {
        const exists = await this.userModel.findOne({ email: createUserDto.email });
        if (exists)
            throw new ConflictException("Bu email sistemde zaten kayıtlı");
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const created = await this.userModel.create({
            name: createUserDto.name,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: hashedPassword,
            roleId : createUserDto.roleId
        });
        const dto = plainToInstance(UserDto, created.toObject());
        const result: IGenericResponse<UserDto> = {
            message: "Kullanıcı başarıyla eklendi",
            result: dto,
            success: true
        }
        return result;
    }

    async getUsers(): Promise<IGenericResponse<UserDto[]>> {
        const users = await this.userModel.find();
        if (users.length === 0)
            throw new NotFoundException("Kullanıcı bulunamadı");
        const dto = users.map(u => plainToInstance(UserDto, u.toObject()));
        const result: IGenericResponse<UserDto[]> = {
            message: "Kullanıcılar başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getUserById(userId: string): Promise<IGenericResponse<UserDto>> {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new NotFoundException("Kullanıcı bulunamadı");
        const dto = plainToInstance(UserDto, user.toObject());
        const result: IGenericResponse<UserDto> = {
            message: "Kullanıcı başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getUserByEmail(email: string): Promise<IGenericResponse<UserDto>> {
        const user = await this.userModel.findOne({ email: email });
        if (!user)
            throw new NotFoundException("Kullanıcı bulunamadı");
        const dto = plainToInstance(UserDto, user.toObject());
        const result: IGenericResponse<UserDto> = {
            message: "Kullanıcı başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getUsersByRoleId(roleId: string): Promise<IGenericResponse<UserDto[]>> {
        const users = await this.userModel.find({ roleId });
        const dto = users.map(u => plainToInstance(UserDto, u.toObject()));
        const result: IGenericResponse<UserDto[]> = {
            message: "Role göre kullanıcılar başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IGenericResponse<UserDto>> {
        const exists = await this.userModel.findOne({ email: updateUserDto.email });
        if (exists)
            throw new ConflictException("Bu email sistemde zaten kayıtlı");
        if (updateUserDto.password !== undefined) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        const updateQuery = buildUpdateQuery(updateUserDto,"");
        const updated = await this.userModel.findByIdAndUpdate(userId, {$set : updateQuery});
        if (!updated)
            throw new NotFoundException("Kullanıcı bulunamadı");
        const dto = plainToInstance(UserDto, updated.toObject());
        const result: IGenericResponse<UserDto> = {
            message: "Kullanıcı başarıyla güncellendi",
            result: dto,
            success: true
        }
        return result;
    }


    async deleteUser(userId: string): Promise<IGenericResponse<UserDto>> {
        const deleted = await this.userModel.findByIdAndDelete(userId);
        const dto = plainToInstance(UserDto, deleted);
        if (!deleted)
            throw new NotFoundException("Kullanıcı bulunamadı");
        const result: IGenericResponse<UserDto> = {
            message: "Kullanıcı başarıyla silindi",
            result: dto,
            success: true
        }
        return result;
    }


}

export default UserService;



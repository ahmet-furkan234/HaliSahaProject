import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreateUserDto, UpdateUserDto, UserDto } from "../dtos/user.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";
import { IUser } from "../database/entities/user-interface.model.js";
import type { IUserService } from "./user-service.interface.js";
import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import userModel from "../database/models/user.model.js";

@injectable()
export class UserService implements IUserService {

    private userModel: typeof userModel
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
        const update: Partial<IUser> = {};
        if (updateUserDto.name !== undefined) update.name = updateUserDto.name;
        if (updateUserDto.lastName !== undefined) update.lastName = updateUserDto.lastName;
        if (updateUserDto.email !== undefined) update.email = updateUserDto.email;
        if (updateUserDto.password !== undefined) update.password = await bcrypt.hash(updateUserDto.password, 10);
        const updated = await this.userModel.findByIdAndUpdate(userId, update, { new: true });
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



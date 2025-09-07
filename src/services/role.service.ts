import { AssignRoleDto, CreateRoleDto, RoleDto, UnassignRoleDto, UpdateRoleDto } from "../dtos/role.dto.js";
import { ConflictException, NotFoundException } from "../utils/appError.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";
import type { IRoleService } from "./role-service.interface.js";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";
import roleModel from "../database/models/role.model.js";
import userModel from "../database/models/user.model.js";

@injectable()
export class RoleService implements IRoleService {
    private roleModel: typeof roleModel
    private userModel: typeof userModel
    constructor() {
        this.userModel = userModel;
        this.roleModel = roleModel;
    }
    
    async createRole(createRoleDto: CreateRoleDto): Promise<IGenericResponse<RoleDto>> {
        const exists = await roleModel.findOne({ name: createRoleDto.name })
        if (exists) {
            throw new ConflictException("Bu rol sistemde zaten kayıtlı");
        }

        const created = await this.roleModel.create({ name: createRoleDto.name });
        const dto = plainToInstance(RoleDto, created.toObject());
        const result: IGenericResponse<RoleDto> = {
            message: "Rol başarıyla oluşturuldu",
            result: dto,
            success: true
        }

        return result;
    }

    async getRoles(): Promise<IGenericResponse<RoleDto[]>> {
        const roles = await this.roleModel.find();
        if (roles.length === 0) {
            throw new NotFoundException("Rol bulunamadı");
        }

        const dto = roles.map(r => plainToInstance(RoleDto, r.toObject()));
        const result: IGenericResponse<RoleDto[]> = {
            message: "Roller başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }

    async getRoleById(roleId: string): Promise<IGenericResponse<RoleDto>> {
        const role = await this.roleModel.findById(roleId);
        if (!role) {
            throw new NotFoundException("Rol bulunamadı");
        }

        const dto = plainToInstance(RoleDto, role.toObject());
        const result: IGenericResponse<RoleDto> = {
            message: "Rol başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }

    async updateRole(roleId: string, updateRoleDto: UpdateRoleDto): Promise<IGenericResponse<RoleDto>> {
        const exists = await this.roleModel.findOne({ name: updateRoleDto.name });
        if (exists) {
            throw new ConflictException("Bu rol sistemde zaten kayıtlı");
        }

        const updated = await this.roleModel.findByIdAndUpdate(roleId, { ...updateRoleDto }, { new: true });
        if (!updated) {
            throw new NotFoundException("Rol bulunamadı");
        }

        const dto = plainToInstance(RoleDto, updated.toObject());
        const result: IGenericResponse<RoleDto> = {
            message: "Rol başarıyla güncellendi",
            result: dto,
            success: true
        }

        return result;
    }

    async deleteRoleById(roleId: string): Promise<IGenericResponse<RoleDto>> {
        const deleted = await this.roleModel.findByIdAndDelete(roleId);
        if (!deleted) {
            throw new NotFoundException("Rol bulunamadı");
        }

        const dto = plainToInstance(RoleDto, deleted.toObject());
        const result: IGenericResponse<RoleDto> = {
            message: "Rol başarıyla silindi",
            result: dto,
            success: true
        }

        return result;
    }

    async deleteRoleByName(roleName: string): Promise<IGenericResponse<RoleDto>> {
        const deleted = await this.roleModel.findOneAndDelete({ name: roleName });
        if (!deleted) {
            throw new NotFoundException("Rol bulunamadı");
        }

        const dto = plainToInstance(RoleDto, deleted.toObject());
        const result: IGenericResponse<RoleDto> = {
            message: "Rol başarıyla silindi",
            result: dto,
            success: true
        }

        return result;
    }

    async assignRole(assignRoleDto: AssignRoleDto): Promise<IGenericResponse<null>> {
        const exists = await this.roleModel.findOne({ _id: assignRoleDto.roleId })
        if (exists) {
            throw new NotFoundException("Eklencek rol bulunamadı");
        }

        const updated = await this.userModel.findByIdAndUpdate(assignRoleDto.userId, { roleId: assignRoleDto.roleId }, { new: true });
        if (!updated) {
            throw new NotFoundException("Kullanıcı bulunamadı");
        }

        const result: IGenericResponse<null> = {
            message: "Rol kullanıcıya başarıyla eklendi",
            result: null,
            success: true
        }

        return result
    }

    async unassingRole(unassignRoleDto: UnassignRoleDto): Promise<IGenericResponse<null>> {
        let updateOperation: any;
        let message: string;

        if (unassignRoleDto.roleId) {
            const exists = await this.roleModel.findById(unassignRoleDto.roleId);
            if (exists) {
                throw new NotFoundException("Belirtilen rol bulunamadı");
            }

            updateOperation = { roleId: unassignRoleDto.roleId };
            message = "Kullanıcının rolü başarıyla değiştirildi";
        } else {
            updateOperation = { $unset: { roleId: 1 } };
            message = "Rol kullanıcıdan başarıyla kaldırıldı";
        }

        const updated = await this.userModel.findByIdAndUpdate(unassignRoleDto.userId, updateOperation);
        if (!updated) {
            throw new NotFoundException("Kullanıcı bulunamadı");
        }

        const result: IGenericResponse<null> = {
            message: message,
            result: null,
            success: true
        }
        
        return result
    }
}
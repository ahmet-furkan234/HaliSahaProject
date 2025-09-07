import type { AssignRoleDto, CreateRoleDto, RoleDto, UnassignRoleDto, UpdateRoleDto } from "../dtos/role.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";

export interface IRoleService {
    createRole(createRoleDto: CreateRoleDto): Promise<IGenericResponse<RoleDto>>;
    getRoles(): Promise<IGenericResponse<RoleDto[]>>;
    getRoleById(roleId: string): Promise<IGenericResponse<RoleDto | String>>;
    updateRole(roleId: string, updateRoleDto: UpdateRoleDto): Promise<IGenericResponse<RoleDto>>;
    deleteRoleById(roleId: string): Promise<IGenericResponse<RoleDto>>;
    deleteRoleByName(roleName: string): Promise<IGenericResponse<RoleDto>>;
    assignRole(assignRoleDto: AssignRoleDto): Promise<IGenericResponse<null>>;
    unassingRole(unassignRoleDto: UnassignRoleDto): Promise<IGenericResponse<null>>;
}
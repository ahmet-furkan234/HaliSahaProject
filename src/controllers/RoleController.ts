import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import RoleService from "../services/role.service.js";
import TYPES from "../types.js";


@injectable()
export class RoleController {
    constructor(@inject(TYPES.IRoleService) private roleService: RoleService) { }

    public createRole = async (req: Request, res: Response) => {
        const response = await this.roleService.createRole(req.body);
        return res.status(200).json(response);
    };

    public getRoles = async (_req: Request, res: Response) => {
        const response = await this.roleService.getRoles();
        return res.status(200).json(response);
    };

    public getRoleById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.roleService.getRoleById(id);
        return res.status(200).json(response);
    };

    public updateRole = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.roleService.updateRole(id, req.body);
        return res.status(200).json(response);
    };

    public deleteRoleById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.roleService.deleteRoleById(id);
        return res.status(200).json(response);
    };

    public deleteRoleByName = async (req: Request, res: Response) => {
        const { name } = req.params;
        const response = await this.roleService.deleteRoleByName(name);
        return res.status(200).json(response);
    };

    public assignRole = async (req: Request, res: Response) => {
        const assignRoleDto = req.body;
        const response = await this.roleService.assignRole(assignRoleDto);
        return res.status(200).json(response);
    };

    public unassignRole = async (req: Request, res: Response) => {
        const unassignRoleDto = req.body;
        const response = await this.roleService.unassingRole(unassignRoleDto);
        return res.status(200).json(response);
    };
}




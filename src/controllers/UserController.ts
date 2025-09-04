import type { Request, Response } from "express";

import TYPES from "../types.js";
import { inject, injectable } from "inversify";
import { UserService } from "../services/user.service.js";

@injectable()
export class UserController {
    constructor(@inject(TYPES.IUserService) private userService: UserService) { }

    public createUser = async (req: Request, res: Response) => {
        const response = await this.userService.createUser(req.body);
        return res.status(201).json(response);
    };

    public getUsers = async (_req: Request, res: Response) => {
        const response = await this.userService.getUsers();
        return res.status(200).json(response);
    };

    public getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.userService.getUserById(id);
        return res.status(response.result ? 200 : 404).json(response);
    };

    public getUsersByRoleId = async (req: Request, res: Response) => {
        const {roleId} = req.params;
        const response = await this.userService.getUsersByRoleId(roleId);
        return res.status(200).json(response);
    };

    public updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.userService.updateUser(id, req.body);
        return res.status(response.result ? 200 : 404).json(response);
    };

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.userService.deleteUser(id);
        return res.status(response.message === "Kullanıcı başarıyla silindi" ? 200 : 404).json(response);
    };

}




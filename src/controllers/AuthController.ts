import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../services/auth.service.js";
import TYPES from "../types.js";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.IAuthService) private authService: AuthService) { }

    public login = async (req: Request, res: Response) => {
        const response = await this.authService.login(req.body);
        return res.status(200).json(response);
    };

    public refresh = async (req: Request, res: Response) => {
        const response = await this.authService.refresh(req.body);
        return res.status(200).json(response);
    };
}



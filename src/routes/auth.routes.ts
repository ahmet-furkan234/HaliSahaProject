import { AuthController } from "../controllers/AuthController.js";
import { LoginDto } from "../dtos/auth.dto.js";
import { Router } from "express";
import TYPES from "../types.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = container.get<AuthController>(TYPES.AuthController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/login", validationMiddleware(LoginDto), this.authController.login);
    }
}

export default AuthRoutes;

import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";

import { Router } from "express";
import TYPES from "../types.js";
import { UserController } from "../controllers/UserController.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class UserRoutes {
    public router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = container.get<UserController>(TYPES.UserController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validationMiddleware(CreateUserDto), this.userController.createUser);
        this.router.get("/", this.userController.getUsers);
        this.router.get("/:id", this.userController.getUserById);
        this.router.get("/role/:roleId", this.userController.getUsersByRoleId);
        this.router.put("/:id", validationMiddleware(UpdateUserDto, { skipMissingProperties: true }), this.userController.updateUser);
        this.router.delete("/:id", this.userController.deleteUser);
    }
}

export default UserRoutes;



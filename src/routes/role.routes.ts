import { AssignRoleDto, CreateRoleDto, UnassignRoleDto, UpdateRoleDto } from "../dtos/role.dto.js";

import { RoleController } from "../controllers/RoleController.js";
import { Router } from "express";
import TYPES from "../types.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class RoleRoutes {
    public router: Router;
    private roleController: RoleController;

    constructor() {
        this.router = Router();
        this.roleController = container.get<RoleController>(TYPES.RoleController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validationMiddleware(CreateRoleDto), this.roleController.createRole);
        this.router.get("/", this.roleController.getRoles);
        this.router.get("/:id", this.roleController.getRoleById);
        this.router.put("/:id", validationMiddleware(UpdateRoleDto, { skipMissingProperties: true }), this.roleController.updateRole);
        this.router.delete("/:id", this.roleController.deleteRoleById);
        //this.router.delete("/name/:name", this.roleController.deleteRoleByName);
        this.router.post("/assign", validationMiddleware(AssignRoleDto), this.roleController.assignRole);
        this.router.post("/unassign", validationMiddleware(UnassignRoleDto), this.roleController.unassignRole);
    }
}

export default RoleRoutes;



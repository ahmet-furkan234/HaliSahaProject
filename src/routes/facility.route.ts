import { CreateFacilityDto, UpdateFacilityDto } from "../dtos/facility.dto.js";

import { AuthController } from "../controllers/AuthController.js";
import { FacilityController } from "../controllers/FacilityController.js";
import { LoginDto } from "../dtos/auth.dto.js";
import { Router } from "express";
import TYPES from "../types.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class FacilityRoutes {
    public router: Router;
    private facilityController: FacilityController;

    constructor() {
        this.router = Router();
        this.facilityController = container.get<FacilityController>(TYPES.FacilityController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validationMiddleware(CreateFacilityDto), this.facilityController.createFacility);
        this.router.get("/", this.facilityController.getFacilitys);
        this.router.get("/:id", this.facilityController.getFacilityById);
        this.router.put("/:id", validationMiddleware(UpdateFacilityDto, { skipMissingProperties: true }), this.facilityController.updateFacility);
        this.router.delete("/:id", this.facilityController.deleteFacilityById);
    }
}

export default FacilityRoutes;

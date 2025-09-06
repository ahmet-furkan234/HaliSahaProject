import { CreatePitchDto, UpdatePitchDto } from "../dtos/pitch.dto.js";

import { PitchController } from "../controllers/PitchController.js";
import { Router } from "express";
import TYPES from "../types.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class PitchRoutes {
    public router: Router;
    private pitchController: PitchController;

    constructor() {
        this.router = Router();
        this.pitchController = container.get<PitchController>(TYPES.PitchController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validationMiddleware(CreatePitchDto), this.pitchController.createPitch);
        this.router.get("/", this.pitchController.getPitches);
        this.router.get("/:id", this.pitchController.getPitchById);
        this.router.put("/:id", validationMiddleware(UpdatePitchDto, { skipMissingProperties: true }), this.pitchController.updatePitch);
        this.router.delete("/:id", this.pitchController.deletePitch);
        this.router.get("/facility/:facilityId", this.pitchController.getPitchesByFacilityId);
        this.router.get("/type/:type", this.pitchController.getPitchesByType);
        this.router.get("/dimension/:dimensionType", this.pitchController.getPitchesByDimensionType);
    }
}

export default PitchRoutes;

import { CreateFeatureDto, UpdateFeatureDto } from "../dtos/feature.dto.js";

import { FeatureController } from "../controllers/FeatureController.js";
import { Router } from "express";
import TYPES from "../types.js";
import container from "../container.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

export class FeatureRoutes {
    public router: Router;
    private featureController: FeatureController;

    constructor() {
        this.router = Router();
        this.featureController = container.get<FeatureController>(TYPES.FeatureController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validationMiddleware(CreateFeatureDto), this.featureController.createFeature);
        this.router.get("/", this.featureController.getFeatures);
        this.router.get("/:id", this.featureController.getFeatureById);
        this.router.put("/:id", validationMiddleware(UpdateFeatureDto, { skipMissingProperties: true }), this.featureController.updateFeature);
        this.router.delete("/:id", this.featureController.deleteFeatureById);
    }
}
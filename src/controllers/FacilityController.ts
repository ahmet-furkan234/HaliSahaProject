import { inject, injectable } from "inversify";
import { FeatureService } from "../services/feature.service.js";
import { Request, Response } from "express";
import TYPES from "../types.js";

@injectable()
export class FeatureController {
    constructor(@inject(TYPES.IFeatureService) private featureService: FeatureService) { }

    public createFeature = async (req: Request, res: Response) => {
        const response = await this.featureService.createFeature(req.body);
        return res.status(200).json(response);
    };
    
    public getFeatures = async (_req: Request, res: Response) => {
        const response = await this.featureService.getFeatures();
        return res.status(200).json(response);
    };

    public getFeatureById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.featureService.getFeatureById(id);
        return res.status(200).json(response);
    };

    public updateFeature = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.featureService.updateFeature(id, req.body);
        return res.status(200).json(response);
    };

    public deleteFeatureById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.featureService.deleteFeatureById(id);
        return res.status(200).json(response);
    };
    
    
}   
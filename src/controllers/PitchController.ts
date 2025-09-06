import type { Request, Response } from "express";

import TYPES from "../types.js";
import { inject, injectable } from "inversify";
import { PitchService } from "../services/pitch.service.js";

@injectable()
export class PitchController {
    constructor(@inject(TYPES.IPitchService) private pitchService: PitchService) { }

    public createPitch = async (req: Request, res: Response) => {
        const response = await this.pitchService.createPitch(req.body);
        return res.status(201).json(response);
    };

    public getPitches = async (_req: Request, res: Response) => {
        const response = await this.pitchService.getPitches();
        return res.status(200).json(response);
    };

    public getPitchById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.pitchService.getPitchById(id);
        return res.status(response.result ? 200 : 404).json(response);
    };

    public getPitchesByFacilityId = async (req: Request, res: Response) => {
        const { facilityId } = req.params;
        const response = await this.pitchService.getPitchesByFacilityId(facilityId);
        return res.status(200).json(response);
    };

    public getPitchesByType = async (req: Request, res: Response) => {
        const { type } = req.params;
        const response = await this.pitchService.getPitchesByType(type as "açık" | "kapalı" | "hibrit");
        return res.status(200).json(response);
    };

    public getPitchesByDimensionType = async (req: Request, res: Response) => {
        const { dimensionType } = req.params;
        const response = await this.pitchService.getPitchesByDimensionType(dimensionType as "minimal" | "normal" | "büyük" | "yarı-büyük");
        return res.status(200).json(response);
    };

    public updatePitch = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.pitchService.updatePitch(id, req.body);
        return res.status(response.result ? 200 : 404).json(response);
    };

    public deletePitch = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.pitchService.deletePitch(id);
        return res.status(response.message === "Saha başarıyla silindi" ? 200 : 404).json(response);
    };
}

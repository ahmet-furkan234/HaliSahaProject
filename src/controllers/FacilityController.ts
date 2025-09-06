import { inject, injectable } from "inversify";

import { Request, Response } from "express";
import TYPES from "../types.js";
import { FacilityService } from "../services/facility.service.js";
import { FacilityFilterDto } from "../dtos/facility.dto.js";

@injectable()
export class FacilityController {
    constructor(@inject(TYPES.IFacilityService) private facilityService: FacilityService) { }

    public createFacility = async (req: Request, res: Response) => {
        const response = await this.facilityService.createFacility(req.body);
        return res.status(200).json(response);
    };
    
    public getFacilitys = async (req: Request, res: Response) => {
        const filters: FacilityFilterDto = req.query;
        const response = await this.facilityService.getFacilities(filters);
        return res.status(200).json(response);
    };

    public getFacilityById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.facilityService.getFacilityById(id);
        return res.status(200).json(response);
    };

    public updateFacility = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.facilityService.updateFacility(id, req.body);
        return res.status(200).json(response);
    };

    public deleteFacilityById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.facilityService.deleteFacilityById(id);
        return res.status(200).json(response);
    };
    
    
}   
import { CreateFacilityDto, FacilityDto, FacilityFilterDto, UpdateFacilityDto } from "../dtos/facility.dto";

import { IGenericResponse } from "../base/IGenericResponse";

export interface IFacilityService {
    createFacility(createFacilityDto: CreateFacilityDto): Promise<IGenericResponse<FacilityDto>>;
    getFacilities(filter? : FacilityFilterDto): Promise<IGenericResponse<FacilityDto[]>>;
    getFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>>;
    updateFacility(facilityId: string, updateFacilityDto: UpdateFacilityDto): Promise<IGenericResponse<FacilityDto>>;
    deleteFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>>;
}
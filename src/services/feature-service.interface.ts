import { CreateFeatureDto, FeatureDto, UpdateFeatureDto } from "../dtos/feature.dto";

import { IGenericResponse } from "../base/IGenericResponse";

export interface IFeatureService {
    createFeature(createFeatureDto: CreateFeatureDto): Promise<IGenericResponse<FeatureDto>>;
    getFeatures(): Promise<IGenericResponse<FeatureDto[]>>;
    getFeatureById(featureId: string): Promise<IGenericResponse<FeatureDto>>;
    updateFeature(featureId: string, updateFeatureDto: UpdateFeatureDto): Promise<IGenericResponse<FeatureDto>>;
    deleteFeatureById(featureId: string): Promise<IGenericResponse<FeatureDto>>;
}
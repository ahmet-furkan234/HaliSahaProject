import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreateFeatureDto, FeatureDto, UpdateFeatureDto } from "../dtos/feature.dto.js";

import { IFeatureService } from "./feature-service.interface.js";
import { IGenericResponse } from "../base/IGenericResponse.js";
import featureModel from "../database/models/feature.model.js";
import { injectable } from "inversify";
import { plainToInstance } from "class-transformer";

@injectable()
export class FeatureService implements IFeatureService {
    private featureModel: typeof featureModel;
    constructor() {
        this.featureModel = featureModel;
    }
    async createFeature(createFeatureDto: CreateFeatureDto): Promise<IGenericResponse<FeatureDto>> {
        const exists = await featureModel.findOne({ name: createFeatureDto.name });
        if (exists) {
            throw new ConflictException("Bu özellik sistemde zaten kayıtlı");
        }

        const created = await this.featureModel.create({ name: createFeatureDto.name });
        const dto = plainToInstance(FeatureDto, created.toObject());
        const result: IGenericResponse<FeatureDto> = {
            message: "Özellik başarıyla oluşturuldu",
            result: dto,
            success: true
        }

        return result;
    }
    async getFeatures(): Promise<IGenericResponse<FeatureDto[]>> {
        const features = await this.featureModel.find();
        if (features.length === 0) {
            throw new NotFoundException("Özellik bulunamadı");
        }

        const dto = features.map(f => plainToInstance(FeatureDto, f.toObject()));
        const result: IGenericResponse<FeatureDto[]> = {
            message: "Özellik'ler başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }
    async getFeatureById(featureId: string): Promise<IGenericResponse<FeatureDto>> {
        const feature = await this.featureModel.findById(featureId);
        if (!feature) {
            throw new NotFoundException("Özellik bulunamadı");
        }

        const dto = plainToInstance(FeatureDto, feature.toObject());
        const result: IGenericResponse<FeatureDto> = {
            message: "Özellikler başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }
    async updateFeature(featureId: string, updateFeatureDto: UpdateFeatureDto): Promise<IGenericResponse<FeatureDto>> {
        const exists = await this.featureModel.findOne({ name: updateFeatureDto.name });
        if (exists) {
            throw new ConflictException("Bu özellik sistemde zaten kayıtlı");
        }

        const updated = await this.featureModel.findByIdAndUpdate(featureId, { ...updateFeatureDto }, { new: true });
        if (!updated) {
            throw new NotFoundException("Özellik bulunamadı");
        }

        const dto = plainToInstance(FeatureDto, updated.toObject());
        const result: IGenericResponse<FeatureDto> = {
            message: "Özellik başarıyla güncellendi",
            result: dto,
            success: true
        }

        return result;
    }
    async deleteFeatureById(featureId: string): Promise<IGenericResponse<FeatureDto>> {
        const deleted = await this.featureModel.findByIdAndDelete(featureId);
        if (!deleted) {
            throw new NotFoundException("Özellik bulunamadı");
        }

        const dto = plainToInstance(FeatureDto, deleted.toObject());
        const result: IGenericResponse<FeatureDto> = {
            message: "Özellik başarıyla silindi",
            result: dto,
            success: true
        }
        
        return result;
    }
}
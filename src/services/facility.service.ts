import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreateFacilityDto, FacilityDto, FacilityFilterDto, UpdateFacilityDto } from "../dtos/facility.dto.js";

import { IFacilityService } from "./facility-service.interface.js";
import { IGenericResponse } from "../base/IGenericResponse.js";
import { PartialDeep } from "type-fest";
import { buildUpdateQuery } from "../utils/updateQueryBuilder.js";
import facilityModel from "../database/models/facility.model.js";
import featureModel from "../database/models/feature.model.js";
import { injectable } from "inversify";
import { mongo } from "mongoose";
import { plainToInstance } from "class-transformer";

@injectable()
export class FacilityService implements IFacilityService {

    private facilityModel: typeof facilityModel;
    private featureModel: typeof featureModel;
    constructor() {
        this.facilityModel = facilityModel;
        this.featureModel = featureModel;
    }

    async createFacility(createFacilityDto: CreateFacilityDto): Promise<IGenericResponse<FacilityDto>> {
        if (await this.facilityModel.findOne({ name: createFacilityDto.name })) {
            throw new ConflictException("Bu tesis sistemde zaten kayıtlı");
        }

        const validFeatures: string[] = [];
        for (const id of createFacilityDto.features || []) {
            const exists = await this.featureModel.findById(id);
            if (exists) validFeatures.push(exists._id);
        }
        createFacilityDto.features = validFeatures;

        const created = await this.facilityModel.create(createFacilityDto);
        const dto = plainToInstance(FacilityDto, created.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla oluşturuldu",
            result: dto,
            success: true
        }

        return result;
    }

    async getFacilities(filter?: FacilityFilterDto): Promise<IGenericResponse<FacilityDto[]>> {
        const mongoFilter: any = {};

        if (filter?.name) {
            mongoFilter.name = new RegExp(filter.name, "i");
        }
        
        if (filter?.city) {
            mongoFilter["location.city"] = new RegExp(filter.city, "i");
        }
        if (filter?.district) {
            mongoFilter["location.district"] = new RegExp(filter.district, "i");
        }
        if (filter?.features) {
            mongoFilter.features = { $all: filter.features };
        }

        if (filter?.rating?.min || filter?.rating?.max) {
            mongoFilter["rating.average"] = {};

            if (filter.rating.min != null) {
                mongoFilter["rating.average"].$gte = filter.rating.min;
            }

            if (filter.rating.max != null) {
                mongoFilter["rating.average"].$lte = filter.rating.max;
            }
        }

        const facilities = await this.facilityModel.find(mongoFilter).populate("features", "name").collation({ locale: "tr", strength: 1 });
        if (facilities.length === 0) {
            throw new NotFoundException("Tesis bulunamadı");
        }

        for (const facility of facilities) {
            const featureNames = facility.features.map((f: any) => f.name);
            facility.features = featureNames;
        }

        const dto = facilities.map(f => plainToInstance(FacilityDto, f.toObject()));
        const result: IGenericResponse<FacilityDto[]> = {
            message: "Tesisler başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }

    async getFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>> {
        const facility = await this.facilityModel.findById(facilityId).populate("features", "name");;
        if (!facility) {
            throw new NotFoundException("Tesis bulunamadı");
        }

        const featureNames = facility.features.map((f: any) => f.name);
        facility.features = featureNames;

        const dto = plainToInstance(FacilityDto, facility.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }

    async updateFacility(facilityId: string, updateFacilityDto: PartialDeep<UpdateFacilityDto>): Promise<IGenericResponse<FacilityDto>> {
        if (updateFacilityDto.name !== undefined) {
            const exists = await this.facilityModel.findOne({ name: updateFacilityDto.name })
            if (exists && exists._id.toString() !== facilityId) {
                throw new ConflictException("Bu tesis sistemde zaten kayıtlı");
            }
        }

        if (updateFacilityDto.features !== undefined) {
            const validFeatures: string[] = [];
            for (const id of updateFacilityDto.features || []) {
                const exists = await this.featureModel.findById(id);
                if (exists) validFeatures.push(exists._id);
            }
            updateFacilityDto.features = validFeatures;
        }

        const updateQuery = buildUpdateQuery(updateFacilityDto, "");
        const updated = await this.facilityModel.findByIdAndUpdate(facilityId, { $set: updateQuery }, { new: true })
        if (!updated) {
            throw new NotFoundException("Tesis bulunamadı");
        }

        const dto = plainToInstance(FacilityDto, updated.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla güncellendi",
            result: dto,
            success: true
        }

        return result;
    }
    async deleteFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>> {
        const deleted = await this.facilityModel.findByIdAndDelete(facilityId).populate("features", "name");;
        if (!deleted) {
            throw new NotFoundException("Tesis bulunamadı");
        }

        const featureNames = deleted.features.map((f: any) => f.name);
        deleted.features = featureNames;

        const dto = plainToInstance(FacilityDto, deleted.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla silindi",
            result: dto,
            success: true
        }

        return result;
    }
}
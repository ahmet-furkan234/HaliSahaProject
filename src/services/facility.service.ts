import { ConflictException, NotFoundException } from "../utils/appError";
import { CreateFacilityDto, FacilityDto, UpdateFacilityDto } from "../dtos/facility.dto";

import { IFacilityService } from "./facility-service.interface";
import { IGenericResponse } from "../base/IGenericResponse";
import facilityModel from "../database/models/facility.model";
import { plainToInstance } from "class-transformer";

export class FacilityService implements IFacilityService {

    private facilityModel: typeof facilityModel;
    constructor() {
        this.facilityModel = facilityModel;
    }

    async createFacility(createFacilityDto: CreateFacilityDto): Promise<IGenericResponse<FacilityDto>> {
        if (await facilityModel.findOne({ name: createFacilityDto.name }))
            throw new ConflictException("Bu tesis sistemde zaten kayıtlı");
        const created = await this.facilityModel.create(createFacilityDto);
        const dto = plainToInstance(FacilityDto, created.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla oluşturuldu",
            result: dto,
            success: true
        }
        return result;
    }
    async getFacilities(): Promise<IGenericResponse<FacilityDto[]>> {
        const features = await this.facilityModel.find();
        if (features.length === 0)
            throw new NotFoundException("Özellik bulunamadı");
        const dto = features.map(f => plainToInstance(FacilityDto, f.toObject()));
        const result: IGenericResponse<FacilityDto[]> = {
            message: "Tesisler başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }
    async getFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>> {
        const facility = await this.facilityModel.findById(facilityId);
        if (!facility)
            throw new NotFoundException("Özellik bulunamadı");
        const dto = plainToInstance(FacilityDto, facility.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesisler başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }
    async updateFacility(facilityId: string, updateFacilityDto: UpdateFacilityDto): Promise<IGenericResponse<FacilityDto>> {
        if (await this.facilityModel.findOne({ name: updateFacilityDto.name }))
            throw new ConflictException("Bu tesis sistemde zaten kayıtlı");
        const updated = await this.facilityModel.findByIdAndUpdate(facilityId, { ...updateFacilityDto }, { new: true });
        if (!updated)
            throw new NotFoundException("Tesis bulunamadı");
        const dto = plainToInstance(FacilityDto, updated.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla güncellendi",
            result: dto,
            success: true
        }
        return result;
    }
    async deleteFacilityById(facilityId: string): Promise<IGenericResponse<FacilityDto>> {
        const deleted = await this.facilityModel.findByIdAndDelete(facilityId);
        if (!deleted)
            throw new NotFoundException("Özellik bulunamadı");
        const dto = plainToInstance(FacilityDto, deleted.toObject());
        const result: IGenericResponse<FacilityDto> = {
            message: "Tesis başarıyla silindi",
            result: dto,
            success: true
        }
        return result;
    }
}
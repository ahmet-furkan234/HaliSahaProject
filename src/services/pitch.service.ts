import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreatePitchDto, PitchDto, UpdatePitchDto } from "../dtos/pitch.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";
import type { IPitchService } from "./pitch-service.interface.js";
import PitchModel from "../database/models/pitch.model.js";
import { buildUpdateQuery } from "../utils/updateQueryBuilder.js";
import { injectable } from "inversify";
import pitchModel from "../database/models/pitch.model.js";
import { plainToInstance } from "class-transformer";

@injectable()
export class PitchService implements IPitchService {

    private pitchModel: typeof PitchModel;
    constructor() {
        this.pitchModel = pitchModel;
    }

    async createPitch(createPitchDto: CreatePitchDto): Promise<IGenericResponse<PitchDto>> {
        const exists = await this.pitchModel.findOne({ name: createPitchDto.name });
        if (exists)
            throw new ConflictException("Bu saha adı sistemde zaten kayıtlı");
        
        const created = await this.pitchModel.create(createPitchDto);
        
        const dto = plainToInstance(PitchDto, created.toObject());
        const result: IGenericResponse<PitchDto> = {
            message: "Saha başarıyla eklendi",
            result: dto,
            success: true
        }
        return result;
    }

    async getPitches(): Promise<IGenericResponse<PitchDto[]>> {
        const pitches = await this.pitchModel.find();
        if (pitches.length === 0)
            throw new NotFoundException("Saha bulunamadı");
        
        const dto = pitches.map(p => plainToInstance(PitchDto, p.toObject()));
        const result: IGenericResponse<PitchDto[]> = {
            message: "Sahalar başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getPitchById(pitchId: string): Promise<IGenericResponse<PitchDto>> {
        const pitch = await this.pitchModel.findById(pitchId);
        if (!pitch)
            throw new NotFoundException("Saha bulunamadı");
        
        const dto = plainToInstance(PitchDto, pitch.toObject());
        const result: IGenericResponse<PitchDto> = {
            message: "Saha başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getPitchesByFacilityId(facilityId: string): Promise<IGenericResponse<PitchDto[]>> {
        const pitches = await this.pitchModel.find({ facilityId });
        if (pitches.length === 0)
            throw new NotFoundException("Bu tesise ait saha bulunamadı");
        
        const dto = pitches.map(p => plainToInstance(PitchDto, p.toObject()));
        const result: IGenericResponse<PitchDto[]> = {
            message: "Tesis sahaları başarıyla getirildi",
            result: dto,
            success: true
        }
        return result;
    }

    async getPitchesByType(type: "açık" | "kapalı" | "hibrit"): Promise<IGenericResponse<PitchDto[]>> {
        const pitches = await this.pitchModel.find({ type });
        if (pitches.length === 0)
            throw new NotFoundException("Bu tipte saha bulunamadı");
        
        const dto = pitches.map(p => plainToInstance(PitchDto, p.toObject()));
        const result: IGenericResponse<PitchDto[]> = {
            message: `${type} tipindeki sahalar başarıyla getirildi`,
            result: dto,
            success: true
        }
        return result;
    }

    async getPitchesByDimensionType(dimensionType: "minimal" | "normal" | "büyük" | "yarı-büyük"): Promise<IGenericResponse<PitchDto[]>> {
        const pitches = await this.pitchModel.find({ dimensionType });
        if (pitches.length === 0)
            throw new NotFoundException("Bu boyut tipinde saha bulunamadı");
        
        const dto = pitches.map(p => plainToInstance(PitchDto, p.toObject()));
        const result: IGenericResponse<PitchDto[]> = {
            message: `${dimensionType} boyutundaki sahalar başarıyla getirildi`,
            result: dto,
            success: true
        }
        return result;
    }

    async updatePitch(pitchId: string, updatePitchDto: UpdatePitchDto): Promise<IGenericResponse<PitchDto>> {
        if (updatePitchDto.name) {
            const exists = await this.pitchModel.findOne({ 
                name: updatePitchDto.name,
                facilityId : updatePitchDto.facilityId,
                _id: { $ne: pitchId }
            });
            if (exists)
                throw new ConflictException("Bu saha adı sistemde zaten kayıtlı");
        }

        const updateQuery = buildUpdateQuery(updatePitchDto, "");
        const updated = await this.pitchModel.findByIdAndUpdate(pitchId, { $set: updateQuery });
        if (!updated)
            throw new NotFoundException("Saha bulunamadı");
        
        const dto = plainToInstance(PitchDto, updated.toObject());
        const result: IGenericResponse<PitchDto> = {
            message: "Saha başarıyla güncellendi",
            result: dto,
            success: true
        }
        return result;
    }

    async deletePitch(pitchId: string): Promise<IGenericResponse<PitchDto>> {
        const deleted = await this.pitchModel.findByIdAndDelete(pitchId);
        if (!deleted)
            throw new NotFoundException("Saha bulunamadı");
        
        const dto = plainToInstance(PitchDto, deleted.toObject());
        const result: IGenericResponse<PitchDto> = {
            message: "Saha başarıyla silindi",
            result: dto,
            success: true
        }
        return result;
    }
}


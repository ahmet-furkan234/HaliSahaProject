import { ConflictException, NotFoundException } from "../utils/appError.js";
import { CreatePitchDto, PitchDto, UpdatePitchDto } from "../dtos/pitch.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";
import type { IPitchService } from "./pitch-service.interface.js";
import { buildUpdateQuery } from "../utils/updateQueryBuilder.js";
import facilityModel from "../database/models/facility.model.js";
import { injectable } from "inversify";
import pitchModel from "../database/models/pitch.model.js";
import { plainToInstance } from "class-transformer";

@injectable()
export class PitchService implements IPitchService {
    private pitchModel: typeof pitchModel;
    private facilityModel: typeof facilityModel
    constructor() {
        this.pitchModel = pitchModel;
        this.facilityModel = facilityModel;
    }

    async createPitch(createPitchDto: CreatePitchDto): Promise<IGenericResponse<PitchDto>> {
        const facilityExists = await this.facilityModel.findById(createPitchDto.facilityId)
        if (!facilityExists) {
            throw new NotFoundException("Belirtilen tesis bulunamadı");
        }

        const exists = await this.pitchModel.findOne({ name: createPitchDto.name, facilityId: createPitchDto.facilityId });
        if (exists) {
            throw new ConflictException("Bu tesis için saha adı sistemde zaten kayıtlı");
        }

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
        const pitches = await this.pitchModel.find().populate("facilityId","name");
        if (pitches.length === 0) {
            throw new NotFoundException("Saha bulunamadı");
        }

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
        if (!pitch) {
            throw new NotFoundException("Saha bulunamadı");
        }

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
        if (pitches.length === 0) {
            throw new NotFoundException("Tesise ait saha bulunamadı");
        }

        const dto = pitches.map(p => plainToInstance(PitchDto, p.toObject()));
        const result: IGenericResponse<PitchDto[]> = {
            message: "Tesisin sahaları başarıyla getirildi",
            result: dto,
            success: true
        }

        return result;
    }

    async getPitchesByType(type: "açık" | "kapalı" | "hibrit"): Promise<IGenericResponse<PitchDto[]>> {
        const pitches = await this.pitchModel.find({ type });
        if (pitches.length === 0) {
            throw new NotFoundException("Bu tipte saha bulunamadı");
        }

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
        if (pitches.length === 0) {
            throw new NotFoundException("Bu boyut tipinde saha bulunamadı");
        }

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
                facilityId: updatePitchDto.facilityId,
                _id: { $ne: pitchId }
            });
            
            if (exists) {
                throw new ConflictException("Saha adı tesisde zaten kayıtlı");
            }
        }

        const updateQuery = buildUpdateQuery(updatePitchDto, "");
        const updated = await this.pitchModel.findByIdAndUpdate(pitchId, { $set: updateQuery });
        if (!updated) {
            throw new NotFoundException("Saha bulunamadı");
        }

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
        if (!deleted) {
            throw new NotFoundException("Saha bulunamadı");
        }

        const dto = plainToInstance(PitchDto, deleted.toObject());
        const result: IGenericResponse<PitchDto> = {
            message: "Saha başarıyla silindi",
            result: dto,
            success: true
        }

        return result;
    }
}
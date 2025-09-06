import { CreatePitchDto, PitchDto, UpdatePitchDto } from "../dtos/pitch.dto.js";

import type { IGenericResponse } from "../base/IGenericResponse.js";

export interface IPitchService {
    createPitch(createPitchDto: CreatePitchDto): Promise<IGenericResponse<PitchDto>>;
    getPitches(): Promise<IGenericResponse<PitchDto[]>>;
    getPitchById(pitchId: string): Promise<IGenericResponse<PitchDto>>;
    getPitchesByFacilityId(facilityId: string): Promise<IGenericResponse<PitchDto[]>>;
    getPitchesByType(type: "açık" | "kapalı" | "hibrit"): Promise<IGenericResponse<PitchDto[]>>;
    getPitchesByDimensionType(dimensionType: "minimal" | "normal" | "büyük" | "yarı-büyük"): Promise<IGenericResponse<PitchDto[]>>;
    updatePitch(pitchId: string, updatePitchDto: UpdatePitchDto): Promise<IGenericResponse<PitchDto>>;
    deletePitch(pitchId: string): Promise<IGenericResponse<PitchDto>>;
}

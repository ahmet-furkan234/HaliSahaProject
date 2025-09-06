// interface 
// dto
// response

import { Exclude, Expose } from "class-transformer";
import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, MinLength } from 'class-validator';

export interface IPitchDto {
    pitchId: string;
    pitchName: string;
    description?: string;
    width: number;
    length: number;
    dimensionType: "minimal" | "normal" | "büyük" | "yarı-büyük";
    hasStand: boolean;
    coverImage: string;
    images: string[];
    maxPlayers: number;
    type: "açık" | "kapalı" | "hibrit";
    facilityId: string;
}

export interface ICreatePitchDto {
    name: string;
    description?: string;
    width: number;
    length: number;
    dimensionType: "minimal" | "normal" | "büyük" | "yarı-büyük";
    hasStand: boolean;
    coverImage: string;
    images: string[];
    maxPlayers: number;
    type: "açık" | "kapalı" | "hibrit";
    facilityId: string;
}

export interface IUpdatePitchDto {
    name?: string;
    description?: string;
    width?: number;
    length?: number;
    dimensionType?: "minimal" | "normal" | "büyük" | "yarı-büyük";
    hasStand?: boolean;
    coverImage?: string;
    images?: string[];
    maxPlayers?: number;
    type?: "açık" | "kapalı" | "hibrit";
    facilityId?: string;
}

export class UpdatePitchDto implements IUpdatePitchDto {
    @IsOptional()
    @IsString({ message: 'Saha adı metin formatında olmalıdır' })
    @MinLength(2, { message: 'Saha adı en az 2 karakter olmalıdır' })
    @MaxLength(50, { message: 'Saha adı en fazla 50 karakter olmalıdır' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Açıklama metin formatında olmalıdır' })
    @MaxLength(500, { message: 'Açıklama en fazla 500 karakter olmalıdır' })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Genişlik sayı formatında olmalıdır' })
    @IsPositive({ message: 'Genişlik pozitif bir sayı olmalıdır' })
    width?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Uzunluk sayı formatında olmalıdır' })
    @IsPositive({ message: 'Uzunluk pozitif bir sayı olmalıdır' })
    length?: number;

    @IsOptional()
    @IsIn(["minimal", "normal", "büyük", "yarı-büyük"], { message: 'Geçerli bir boyut tipi seçiniz' })
    dimensionType?: "minimal" | "normal" | "büyük" | "yarı-büyük";

    @IsOptional()
    @IsBoolean({ message: 'Tribün bilgisi boolean formatında olmalıdır' })
    hasStand?: boolean;

    @IsOptional()
    @IsString({ message: 'Kapak resmi metin formatında olmalıdır' })
    coverImage?: string;

    @IsOptional()
    @IsArray({ message: 'Resimler dizi formatında olmalıdır' })
    @IsString({ each: true, message: 'Her resim metin formatında olmalıdır' })
    images?: string[];

    @IsOptional()
    @IsNumber({}, { message: 'Maksimum oyuncu sayısı sayı formatında olmalıdır' })
    @IsPositive({ message: 'Maksimum oyuncu sayısı pozitif bir sayı olmalıdır' })
    maxPlayers?: number;

    @IsOptional()
    @IsIn(["açık", "kapalı", "hibrit"], { message: 'Geçerli bir saha tipi seçiniz' })
    type?: "açık" | "kapalı" | "hibrit";

    @IsOptional()
    @IsString({ message: 'Tesis ID metin formatında olmalıdır' })
    facilityId?: string;
}

export class CreatePitchDto implements ICreatePitchDto {
    @IsString({ message: "Saha adı metin formatında olmalıdır" })
    @Length(2, 50, { message: "Saha adı en az 2, en fazla 50 karakter olmalıdır" })
    name!: string;

    @IsOptional()
    @IsString({ message: "Açıklama metin formatında olmalıdır" })
    @MaxLength(500, { message: "Açıklama en fazla 500 karakter olmalıdır" })
    description?: string;

    @IsNumber({}, { message: "Genişlik sayı formatında olmalıdır" })
    @IsPositive({ message: "Genişlik pozitif bir sayı olmalıdır" })
    width!: number;

    @IsNumber({}, { message: "Uzunluk sayı formatında olmalıdır" })
    @IsPositive({ message: "Uzunluk pozitif bir sayı olmalıdır" })
    length!: number;

    @IsIn(["minimal", "normal", "büyük", "yarı-büyük"], { message: "Geçerli bir boyut tipi seçiniz" })
    dimensionType!: "minimal" | "normal" | "büyük" | "yarı-büyük";

    @IsBoolean({ message: "Tribün bilgisi boolean formatında olmalıdır" })
    hasStand!: boolean;

    @IsString({ message: "Kapak resmi metin formatında olmalıdır" })
    coverImage!: string;

    @IsArray({ message: "Resimler dizi formatında olmalıdır" })
    @IsString({ each: true, message: "Her resim metin formatında olmalıdır" })
    images!: string[];

    @IsNumber({}, { message: "Maksimum oyuncu sayısı sayı formatında olmalıdır" })
    @IsPositive({ message: "Maksimum oyuncu sayısı pozitif bir sayı olmalıdır" })
    maxPlayers!: number;

    @IsIn(["açık", "kapalı", "hibrit"], { message: "Geçerli bir saha tipi seçiniz" })
    type!: "açık" | "kapalı" | "hibrit";

    @IsString({ message: "Tesis ID metin formatında olmalıdır" })
    facilityId!: string;
}

@Exclude()
export class PitchDto implements IPitchDto {
    @Expose({ name: "_id" })
    pitchId!: string;
    
    @Expose({name : "name"})
    pitchName!: string;

    @Expose()
    description?: string;

    @Expose()
    width!: number;

    @Expose()
    length!: number;

    @Expose()
    dimensionType!: "minimal" | "normal" | "büyük" | "yarı-büyük";

    @Expose()
    hasStand!: boolean;

    @Expose()
    coverImage!: string;

    @Expose()
    images!: string[];

    @Expose()
    maxPlayers!: number;

    @Expose()
    type!: "açık" | "kapalı" | "hibrit";

    @Expose()
    facilityId!: string;
}

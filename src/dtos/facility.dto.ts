import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    Max,
    Min,
    Validate,
    ValidateNested,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";

export interface IFacilityLocationDto {
    city: string;
    district: string;
    address: string;
    geo: {
        type: "Point";
        coordinates: [number, number]; // [lon, lat]
    };
}

export interface IFacilitySocialMediaDto {
    facebook?: string;
    instagram?: string;
    twitter?: string;
}

export interface IFacilityContactsDto {
    phone: string | string[];
    email: string;
    website?: string;
    socialMedia?: IFacilitySocialMediaDto;
}

export interface IFacilityRatingDto {
    average: number;
    count: number;
}

export interface IFacilityDto {
    facilityId?: string;
    facilityName: string;
    description?: string;
    location: IFacilityLocationDto;
    contacts: IFacilityContactsDto;
    rating: IFacilityRatingDto;
    coverImage: string;
    images: string[];
    features: string[];
}

export interface ICreateFacilityDto {
    name: string;
    description?: string;
    location: IFacilityLocationDto;
    contacts: IFacilityContactsDto;
    coverImage: string;
    images?: string[];
    features?: string[];
}

export interface IUpdateFacilityDto {
    name?: string;
    description?: string;
    location?: Partial<IFacilityLocationDto>;
    contacts?: Partial<IFacilityContactsDto>;
    coverImage?: string;
    images?: string[];
    features?: string[];
}

export class FacilitySocialMediaDto implements IFacilitySocialMediaDto {
    @IsOptional()
    @IsUrl({}, { message: "Facebook adresi geçerli bir URL olmalıdır" })
    facebook?: string;

    @IsOptional()
    @IsUrl({}, { message: "Instagram adresi geçerli bir URL olmalıdır" })
    instagram?: string;

    @IsOptional()
    @IsUrl({}, { message: "Twitter adresi geçerli bir URL olmalıdır" })
    twitter?: string;
}

export class FacilityLocationDto implements IFacilityLocationDto {
    @IsString({ message: "$property bir metin olmalıdır" })
    @IsNotEmpty({ message: "$property boş olamaz" })
    city!: string;

    @IsString({ message: "$property bir metin olmalıdır" })
    @IsNotEmpty({ message: "$property boş olamaz" })
    district!: string;

    @IsString({ message: "$property bir metin olmalıdır" })
    @IsNotEmpty({ message: "$property boş olamaz" })
    address!: string;

    @ValidateNested()
    @Type(() => FacilityGeoDto)
    geo!: FacilityGeoDto;
}

export class FacilityGeoDto {
    @IsIn(["Point"], { message: '$property değeri "$value" geçersiz; sadece "Point" olabilir' })
    type!: "Point";

    @IsArray({ message: "$property bir dizi olmalıdır" })
    @ArrayMinSize(2, { message: "$property değeri [lon, lat] olmalıdır" })
    @ArrayMaxSize(2, { message: "$property değeri [lon, lat] olmalıdır" })
    @IsNumber({}, { each: true, message: "Koordinatlar sayısal olmalıdır" })
    coordinates!: [number, number];
}

export class FacilityContactsDto implements IFacilityContactsDto {
    phone!: string | string[];

    @IsEmail({}, { message: "Geçerli bir e-posta adresi giriniz" })
    email!: string;

    @IsOptional()
    @IsUrl({}, { message: "Web sitesi geçerli bir URL olmalıdır" })
    website?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => FacilitySocialMediaDto)
    socialMedia?: FacilitySocialMediaDto;
}

export class FacilityRatingDto implements IFacilityRatingDto {
    @IsNumber({}, { message: "Ortalama puan bir sayı olmalıdır" })
    @Min(0, { message: "Ortalama puan en az 0 olmalıdır" })
    @Max(5, { message: "Ortalama puan en fazla 5 olmalıdır" })
    average!: number;

    @IsInt({ message: "Değerlendirme sayısı bir tam sayı olmalıdır" })
    @Min(0, { message: "Değerlendirme sayısı negatif olamaz" })
    count!: number;
}
@Exclude()
export class FacilityDto implements IFacilityDto {

    @Expose({ name: "_id" })
    facilityId?: string;

    @Expose({ name: "name" })
    facilityName!: string;
    @Expose()
    description?: string;

    @Expose()
    @ValidateNested()
    @Type(() => FacilityLocationDto)
    location!: FacilityLocationDto;

    @Expose()
    @ValidateNested()
    @Type(() => FacilityContactsDto)
    contacts!: FacilityContactsDto;

    @Expose()
    @ValidateNested()
    @Type(() => FacilityRatingDto)
    rating!: FacilityRatingDto;

    @Expose()
    coverImage!: string;

    @Expose()
    images!: string[];

    @Expose()
    features!: string[];
}

export class CreateFacilityDto implements ICreateFacilityDto {
    @IsString({ message: "Tesis adı metin olmalıdır" })
    @IsNotEmpty({ message: "Tesis adı boş olamaz" })
    name!: string;

    @IsOptional()
    @IsString({ message: "Açıklama metin olmalıdır" })
    description?: string;

    @ValidateNested()
    @Type(() => FacilityLocationDto)
    location!: FacilityLocationDto;

    @ValidateNested()
    @Type(() => FacilityContactsDto)
    contacts!: FacilityContactsDto;

    @IsUrl({}, { message: "Kapak görseli geçerli bir URL olmalıdır" })
    coverImage!: string;

    @IsOptional()
    @IsArray({ message: "Görseller bir dizi olmalıdır" })
    @IsUrl({}, { each: true, message: "Her görsel geçerli bir URL olmalıdır" })
    images?: string[];

    @IsOptional()
    @IsArray({ message: "Özellikler bir dizi olmalıdır" })
    @IsString({ each: true, message: "Her özellik metin olmalıdır" })
    features?: string[];
}

export class UpdateFacilityDto implements IUpdateFacilityDto {
    @IsOptional()
    @IsString({ message: "Tesis adı metin olmalıdır" })
    name?: string;

    @IsOptional()
    @IsString({ message: "Açıklama metin olmalıdır" })
    description?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => FacilityLocationDto)
    location?: Partial<FacilityLocationDto>;

    @IsOptional()
    @ValidateNested()
    @Type(() => FacilityContactsDto)
    contacts?: Partial<FacilityContactsDto>;

    @IsOptional()
    @IsUrl({}, { message: "Kapak görseli geçerli bir URL olmalıdır" })
    coverImage?: string;

    @IsOptional()
    @IsArray({ message: "Görseller bir dizi olmalıdır" })
    @IsUrl({}, { each: true, message: "Her görsel geçerli bir URL olmalıdır" })
    images?: string[];

    @IsOptional()
    @IsArray({ message: "Özellikler bir dizi olmalıdır" })
    @IsString({ each: true, message: "Her özellik metin olmalıdır" })
    features?: string[];
}
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export interface IFeatureDto {
    featureId?: string;
    featureName: string;
}
export interface ICreateFeatureDto {
    name: string;
}
export interface IUpdateFeatureDto {
    name?: string;
}

@Exclude()
export class FeatureDto implements IFeatureDto {
    @Expose({ name: "_id" })
    featureId?: string;

    @Expose({ name: "name" })
    featureName!: string;
}

export class CreateFeatureDto implements ICreateFeatureDto {
    @IsNotEmpty({ message: 'Feature adı boş olamaz' })
    @IsString({ message: "Feature adı metin formatında olmalıdır" })
    @Length(3, 30, { message: "Feature adı en az 3, en fazla 30 karakter olmalıdır" })
    name!: string;
}

export class UpdateFeatureDto implements IUpdateFeatureDto {
    @IsOptional()
    @IsString({ message: "Feature adı metin formatında olmalıdır" })
    @Length(3, 30, { message: "Feature adı en az 3, en fazla 30 karakter olmalıdır" })
    name?: string;
}
// interface 
// dto
// response

import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsStrongPassword, Length, MaxLength, MinLength } from 'class-validator';

export interface IUserDto {
    name: string;
    lastName: string;
    email: string;
    roleId: string;
}


export interface ICreateUserDto {
    name: string,
    lastName: string,
    email: string,
    password: string,
    roleId: string
}


export interface IUpdateUserDto {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export class UpdateUserDto implements IUpdateUserDto {
    @IsOptional()
    @IsString({ message: 'İsim metin formatında olmalıdır' })
    @MinLength(2, { message: 'İsim en az 2 karakter olmalıdır' })
    @MaxLength(30, { message: 'İsim en fazla 30 karakter olmalıdır' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Soyisim metin formatında olmalıdır' })
    @MinLength(2, { message: 'Soyisim en az 2 karakter olmalıdır' })
    @MaxLength(30, { message: 'Soyisim en fazla 30 karakter olmalıdır' })
    lastName?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Geçerli bir e-posta adresi girmelisiniz' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Şifre metin formatında olmalıdır' })
    @IsStrongPassword({}, { message: 'Şifre çok zayıf. En az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 sembol içermelidir.' })
    password?: string;
}


export class CreateUserDto implements ICreateUserDto {
    @IsString({ message: "İsim metin formatında olmalıdır" })
    @Length(3, 30, { message: "İsminiz en az 3, en fazla 30 karakter olmalıdır" })
    name!: string;

    @IsString({ message: "Soyisim metin formatında olmalıdır" })
    @Length(3, 30, { message: "Soyisminiz en az 3, en fazla 30 karakter olmalıdır" })
    lastName!: string;

    @IsEmail({}, { message: "Geçerli bir e-posta adresi girmelisiniz" })
    email!: string;

    @IsString({ message: "Şifre metin formatında olmalıdır" })
    @Length(6, 50, { message: "Şifre en az 6, en fazla 50 karakter olmalıdır" })
    password!: string;

    roleId!: string;
}

@Exclude()
export class UserDto implements IUserDto {
    @Expose()
    name!: string;

    @Expose()
    lastName!: string;

    @Expose()
    email!: string;

    @Expose()
    roleId!: string;
}
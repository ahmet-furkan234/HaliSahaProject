import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export interface ILoginDto {
    email: string;
    password: string
}

export interface IRefreshResponse {
    bearerToken: string
}

export interface IRefreshDto {
    refreshToken: string
}
export interface ILoginResponse {
    bearerToken: string
    refreshToken: string
}

export interface ILoginRoleDto {
    name: string;

    lastName: string;

    email: string;
    roleId: number;

    roleName: string;
}
export class LoginDto implements ILoginDto {
    @IsNotEmpty({ message: 'Email boş olamaz' })
    @IsEmail({}, { message: 'Geçersiz email formatı' })
    email!: string;
    @IsNotEmpty({ message: 'Şifre boş olamaz' })
    @IsString({ message: 'Şifre metin formatında olmalıdır' })
    @IsStrongPassword({}, { message: 'Şifre çok zayıf. En az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 sembol içermelidir.' })
    password!: string;

}

export class LoginResponse implements ILoginResponse {
    refreshToken!: string;
    bearerToken!: string;
}

export class RefreshResponse implements IRefreshResponse {
    bearerToken!: string;
}

export class RefreshDto implements IRefreshDto {
    refreshToken!: string;
}
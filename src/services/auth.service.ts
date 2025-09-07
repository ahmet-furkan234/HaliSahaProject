import { LoginDto, LoginResponse, RefreshDto, RefreshResponse } from "../dtos/auth.dto.js";
import { AuthorizationException } from "../utils/appError.js";
import { IAuthService } from "./auth-service.interface.js";
import { IGenericResponse } from "../base/IGenericResponse.js";
import bcrypt from 'bcrypt';
import { inject } from "inversify";
import TYPES from "../types.js";
import { IJwtService } from "./jwt-service.interface.js";
import userModel from "../database/models/user.model.js";

export class AuthService implements IAuthService {
    private userModel: typeof userModel
    constructor(@inject(TYPES.IJwtService) private jwtService: IJwtService) {
        this.userModel = userModel;
    }

    async login(loginDto: LoginDto): Promise<IGenericResponse<LoginResponse>> {
        const user = await this.userModel.findOne({ email: loginDto.email }).populate("RoleId");
        if (!user) {
            throw new AuthorizationException("Geçersiz e-posta adresi veya şifre. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.");
        }

        const passwordCheck = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordCheck) {
            throw new AuthorizationException("Geçersiz e-posta adresi veya şifre. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.");
        }

        const payload = {
            userId: user._id,
            userRole: user.roleId.name
        }

        const bToken = await this.jwtService.generateToken(payload, '2h');
        const rToken = await this.jwtService.generateToken({ sub: user._id }, '7d');

        await this.userModel.findByIdAndUpdate(user._id, { $set: { refreshToken: rToken } });
        const dto: LoginResponse = {
            bearerToken: bToken,
            refreshToken: rToken
        }

        const result: IGenericResponse<LoginResponse> = {
            message: "Giriş işlemi başarılı",
            result: dto,
            success: true
        }

        return result;
    }

    async refresh(refreshDto: RefreshDto): Promise<IGenericResponse<RefreshResponse>> {
        const user = await this.userModel.findOne({ refreshToken: refreshDto.refreshToken }).populate("roleId");
        if (!user) {
            throw new AuthorizationException("Geçersiz refresh token");
        }

        await this.jwtService.verifyToken(refreshDto.refreshToken);

        const dto: RefreshResponse = {
            bearerToken: await this.jwtService.generateToken({
                sub: user._id,
                role: user.roleId.name
            }, '15m')
        }

        const result: IGenericResponse<RefreshResponse> = {
            message: "Yeni access token üretildi",
            result: dto,
            success: true
        }

        return result
    }
}
import { LoginDto, LoginResponse, RefreshDto, RefreshResponse } from "../dtos/auth.dto";

import { IGenericResponse } from "../base/IGenericResponse";

export interface IAuthService {
    login(loginDto: LoginDto): Promise<IGenericResponse<LoginResponse>>
    refresh(refreshDto: RefreshDto): Promise<IGenericResponse<RefreshResponse>>
}
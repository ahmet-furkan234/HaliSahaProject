import { SignJWT, jwtVerify } from "jose";

import { AuthorizationException } from "../utils/appError";
import { IJwtService } from "./jwt-service.interface.js";

export class JwtService implements IJwtService {
    async generateToken(payload: any, time: string): Promise<string> {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(time)
            .sign(secret);
    }
    async verifyToken(token: string) {
        try {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            await jwtVerify(token, secret);
        } catch (err: any) {
            if (err.name === "JWTExpired") {
                throw new AuthorizationException("Refresh token süresi dolmuş, lütfen tekrar giriş yapın.");
            }
            if (err.name === "JWSInvalid" || err.name === "JWSSignatureVerificationFailed") {
                throw new AuthorizationException("Geçersiz token, lütfen tekrar giriş yapın.");
            }
            throw new AuthorizationException("Token doğrulama hatası.");
        }
    }
}

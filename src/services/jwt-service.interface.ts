export interface IJwtService {
    generateToken(payload: any,time : string): Promise<string>;
    verifyToken(token: string): Promise<void>;
}
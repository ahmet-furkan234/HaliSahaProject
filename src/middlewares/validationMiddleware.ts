import type { RequestHandler } from "express";
import { validate, type ValidatorOptions } from "class-validator";
import { plainToInstance } from "class-transformer";

export const validationMiddleware = <T>(
    cls: new () => T, //Hangi Dto'nun kullanabileceğini belirler
    options?: ValidatorOptions //ekstra ayar yapmak için
): RequestHandler => {
    return async (req, res, next) => {
        const instance = plainToInstance(cls, req.body);
        if (typeof instance !== "object" || instance === null) {
            return res.status(400).json({ message: "Doğrulama başarısız", errors: ["Geçersiz istek gövdesi"] });
        }
        const errors = await validate(instance as object, options);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Doğrulama başarısız", errors });
        }
        req.body = instance as unknown as Record<string, unknown>;
        return next();
    };
};



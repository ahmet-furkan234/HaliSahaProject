import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/appError.js";
import { IGenericResponse } from "../base/IGenericResponse";

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err instanceof AppError) {
        const response: IGenericResponse<null> = {
            success: false,
            message: err.message,
            result: null,
            errorCode: err.statusCode
        };
        return res.status(err.statusCode).json(response);
    }

    const response: IGenericResponse<null> = {
        success: false,
        message: "Beklenmedik bir hata oluştu",
        result: null,
        errorCode: 500
    };
    return res.status(500).json(response);
}
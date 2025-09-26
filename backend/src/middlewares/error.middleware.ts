import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const genericErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    // Use err.statusCode if it exists, otherwise default to 500
    const statusCode = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
    const message = err?.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message
    });
};

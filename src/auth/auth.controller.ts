import type { Request, Response } from "express";
import ApiError from "../comman/utils/api.errors.js";
import ApiErrorResponse from "../comman/utils/api.errors.response.js";
import ApiResponse from "../comman/utils/api.response.js";
import authService from "./auth.service.js";



const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        return ApiResponse.created(res, "register user", user);
    } catch (error) {
        return handleServiceError(res, error);
    }
};


const login = async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body);
        return ApiResponse.ok(res, "login successfully", token);
    } catch (error) {
        return handleServiceError(res, error);
    }
};



export default {
    register,
    login,
};



const handleServiceError = (res: Response, error: unknown) => {
    if (!(error instanceof ApiError)) {
        return ApiErrorResponse.internal(res);
    }

    if (error.statusCode === 400) return ApiErrorResponse.badRequest(res, error.message);
    if (error.statusCode === 401) return ApiErrorResponse.unauthorized(res, error.message);
    if (error.statusCode === 403) return ApiErrorResponse.forbidden(res, error.message);
    if (error.statusCode === 404) return ApiErrorResponse.notFound(res, error.message);

    return ApiErrorResponse.internal(res, error.message);
};
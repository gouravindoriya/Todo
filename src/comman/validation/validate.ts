import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import ApiErrorResponse from "../utils/api.errors.response.js";

const validate = (zodSchema: ZodType) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const validationResult = await zodSchema.safeParseAsync(req.body);

		if (!validationResult.success) {
			return ApiErrorResponse.badRequest(
				res,
				"Validation failed. Please provide valid request data."
			);
		}

		req.body = validationResult.data;
		return next();
	};
};

export default validate;


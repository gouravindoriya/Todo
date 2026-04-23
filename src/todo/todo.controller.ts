import type { Request, Response } from "express";
import ApiError from "../comman/utils/api.errors.js";
import ApiErrorResponse from "../comman/utils/api.errors.response.js";
import ApiResponse from "../comman/utils/api.response.js";
import todoService from "./todo.service.js";

const createTodo = async (req: Request, res: Response) => {
	try {
		const todo = await todoService.createTodo({
            userId:req.body.user._id,
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            date:req.body.date
           });
        
		return ApiResponse.created(res, "todo created", todo);
	} catch (error) {
		return handleServiceError(res, error);
	}
};

const getTodoIdFromParams = (req: Request): string => {
	const { id } = req.params;
	if (typeof id !== "string" || !id.trim()) {
		throw ApiError.badRequest("Todo id is required");
	}
	return id;
};

const deleteTodo = async (req: Request, res: Response) => {
	try {
		const deletedTodo = await todoService.deleteTodo(getTodoIdFromParams(req));
		return ApiResponse.ok(res, "todo deleted", deletedTodo);
	} catch (error) {
		return handleServiceError(res, error);
	}
};

const updateTodo = async (req: Request, res: Response) => {
	try {
		const updatedTodo = await todoService.updateTodo(getTodoIdFromParams(req), {
			title: req.body.title,
			description: req.body.description,
			tag: req.body.tag,
			date: req.body.date,
		});

		return ApiResponse.ok(res, "todo updated", updatedTodo);
	} catch (error) {
		return handleServiceError(res, error);
	}
};

const getAllTodosOfUser = async (req: Request, res: Response) => {
	try {
		const todos = await todoService.getAllTodosOfUser(req.body.user._id);
		return ApiResponse.ok(res, "all todos fetched", todos);
	} catch (error) {
		return handleServiceError(res, error);
	}
};

const getTodayTodosOfUser = async (req: Request, res: Response) => {
	try {
		const todos = await todoService.getTodayTodosOfUser(req.body.user._id);
		return ApiResponse.ok(res, "today todos fetched", todos);
	} catch (error) {
		return handleServiceError(res, error);
	}
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

export default {
	createTodo,
	deleteTodo,
	updateTodo,
	getAllTodosOfUser,
	getTodayTodosOfUser,
};

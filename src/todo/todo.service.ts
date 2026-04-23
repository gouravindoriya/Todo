import mongoose from "mongoose";
import ApiError from "../comman/utils/api.errors.js";
import Todo from "./todo.modal.js";

export interface CreateTodoPayload {
	userId: string;
	title: string;
	description?: string;
	tag?: string;
	date?: Date | string;
}

export interface UpdateTodoPayload {
	title?: string;
	description?: string;
	tag?: string;
	date?: Date | string;
}

const createTodo = async (payload: CreateTodoPayload) => {
	const { userId, title, description, tag, date } = {...payload};

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw ApiError.badRequest("Invalid user id");
	}

	if (!title?.trim()) {
		throw ApiError.badRequest("Title is required");
	}

	const createTodoData: {
		userId: mongoose.Types.ObjectId;
		title: string;
		description: string;
		tag: string;
		date?: Date;
	} = {
		userId: new mongoose.Types.ObjectId(userId),
		title: title.trim(),
		description: description?.trim() ?? "",
		tag: tag?.toString()??"",
	};

	if (date) {
		const parsedDate = new Date(date);
		if (Number.isNaN(parsedDate.getTime())) {
			throw ApiError.badRequest("Invalid date");
		}
		createTodoData.date = parsedDate;
	}

	const todo = await Todo.create(createTodoData);

	return {
		_id: todo._id,
		title: todo.title,
		description: todo.description,
		tag: todo.tag,
		date: todo.date,
		createdAt: todo.createdAt,
		updatedAt: todo.updatedAt,
	};
};

const deleteTodo = async (id: string) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw ApiError.badRequest("Invalid todo id");
	}

	const deletedTodo = await Todo.findByIdAndDelete(id);
	if (!deletedTodo) {
		throw ApiError.notFound("Todo not found");
	}

	return {
		_id: deletedTodo._id,
		title: deletedTodo.title,
	};
};

const updateTodo = async (id: string, payload: UpdateTodoPayload) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw ApiError.badRequest("Invalid todo id");
	}

	const updateData: {
		title?: string;
		description?: string;
		tag?: string;
		date?: Date;
	} = {};

	if (payload.title !== undefined) {
		const parsedTitle = payload.title.trim();
		if (!parsedTitle) {
			throw ApiError.badRequest("Title cannot be empty");
		}
		updateData.title = parsedTitle;
	}

	if (payload.description !== undefined) {
		updateData.description = payload.description.trim();
	}

	if (payload.tag !== undefined) {
		updateData.tag = payload.tag.trim();
	}

	if (payload.date !== undefined) {
		const parsedDate = new Date(payload.date);
		if (Number.isNaN(parsedDate.getTime())) {
			throw ApiError.badRequest("Invalid date");
		}
		updateData.date = parsedDate;
	}

	if (Object.keys(updateData).length === 0) {
		throw ApiError.badRequest("No valid fields provided for update");
	}

	const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
		returnDocument: "after",
		runValidators: true,
	});

	if (!updatedTodo) {
		throw ApiError.notFound("Todo not found");
	}

	return {
		_id: updatedTodo._id,
		title: updatedTodo.title,
		description: updatedTodo.description,
		tag: updatedTodo.tag,
		date: updatedTodo.date,
		createdAt: updatedTodo.createdAt,
		updatedAt: updatedTodo.updatedAt,
	};
};

const getAllTodosOfUser = async (userId: string) => {
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw ApiError.badRequest("Invalid user id");
	}

	const todos = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({
		createdAt: -1,
	});

	return todos;
};

const getTodayTodosOfUser = async (userId: string) => {
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw ApiError.badRequest("Invalid user id");
	}

	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);

	const endOfToday = new Date();
	endOfToday.setHours(23, 59, 59, 999);

	const todos = await Todo.find({
		userId: new mongoose.Types.ObjectId(userId),
		date: {
			$gte: startOfToday,
			$lte: endOfToday,
		},
	}).sort({ date: 1 });

	return todos;
};


export default {
	createTodo,
	deleteTodo,
	updateTodo,
	getAllTodosOfUser,
	getTodayTodosOfUser,
};

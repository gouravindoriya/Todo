import mongoose from "mongoose";

export interface ITodo {
	userId: mongoose.Types.ObjectId;
	title: string;
	description: string;
	tag: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User id is required"],
			index: true,
		},
		title: {
			type: String,
			trim: true,
			required: [true, "Title is required"],
			maxlength: [120, "Title cannot exceed 120 characters"],
		},
		description: {
			type: String,
			trim: true,
			default: "",
			maxlength: [2000, "Description cannot exceed 2000 characters"],
		},
		tag: {
			type: String,

		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<ITodo>("Todo", todoSchema);

import { z } from "zod";

export const createTodoPayloadModal = z.object({
	title: z.string().min(1, "Title is required").max(120),
	description: z.string().max(2000).optional(),
	tag: z.string().trim().optional(),
	date: z.coerce.date().optional(),
    user: z.object({}).loose(),
});

export const updateTodoPayloadModal = z
	.object({
		title: z.string().min(1, "Title is required").max(120).optional(),
		description: z.string().max(2000).optional(),
		tag: z.string().trim().optional(),
		date: z.coerce.date().optional(),
		user: z.object({}).loose().optional(),
	})
	.refine(
		(payload) =>
			payload.title !== undefined ||
			payload.description !== undefined ||
			payload.tag !== undefined ||
			payload.date !== undefined,
		{
			message: "At least one field is required for update",
		},
	);

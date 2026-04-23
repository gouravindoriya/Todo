import express from "express";
import type { Router } from "express";
import validate from "../comman/validation/validate.js";
import todoController from "./todo.controller.js";
import { createTodoPayloadModal, updateTodoPayloadModal } from "./zod/zod.modals.js";

export const todoRouter: Router = express.Router();

todoRouter.post("/create", validate(createTodoPayloadModal), todoController.createTodo);
todoRouter.get("/", todoController.getAllTodosOfUser);
todoRouter.get("/today", todoController.getTodayTodosOfUser);
todoRouter.patch("/:id", validate(updateTodoPayloadModal), todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);



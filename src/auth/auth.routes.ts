
import express from "express";
import type { Router } from "express";
import authController from "./auth.controller.js";
import validate from "../comman/validation/validate.js";
import { loginPayloadModal, registerPayloadModal } from "./zod/zod.modals.js";

export const authRouter:Router=express.Router()

authRouter.post('/register', validate(registerPayloadModal), authController.register)

authRouter.post('/login', validate(loginPayloadModal), authController.login)



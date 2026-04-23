import { z } from "zod";
import ApiError from "../comman/utils/api.errors.js";
import { generateAccessToken } from "../comman/utils/jwt.utils.js";
import { loginSuccessMail } from "../comman/utils/mailTemplates.js";
import sendMail from "../comman/utils/sendmail.js";
import User from "./auth.modal.js";
import { loginPayloadModal, registerPayloadModal } from "./zod/zod.modals.js";

export type RegisterPayload = z.infer<typeof registerPayloadModal>;
export type LoginPayload = z.infer<typeof loginPayloadModal>;

const register = async (payload: RegisterPayload) => {
	const { firstName, lastName, email, password } = payload;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw ApiError.badRequest("Email already exists");
	}

	const name = [firstName, lastName].filter(Boolean).join(" ");
	const user = await User.create({
		name,
		email,
		password,
	});

	return {
		name: user.name,
		email: user.email,
		role: user.role,
	};
};

const login = async (payload: LoginPayload) => {
	const { email, password } = payload;

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw ApiError.unauthorized("Invalid Email");
	}

	const isMatched = await user.comparePassword(password);
	if (!isMatched) {
		throw ApiError.unauthorized("Invalid password");
	}
   // send mail ....
	try {
		await sendMail(
			loginSuccessMail({
				to: user.email,
				userName: user.name,
				appName: "Auth",
			})
		);
	} catch (_error) {
		// Do not block login if notification email fails.
	}

	const { password: _password, createdAt: _createdAt, updatedAt: _updatedAt, ...safeUser } = user.toObject();
	return generateAccessToken(safeUser);
};

export default {
	register,
	login,
};

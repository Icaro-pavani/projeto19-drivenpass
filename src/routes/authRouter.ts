import { Router } from "express";

import { loginUser, registerUser } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(userSchema), registerUser);
authRouter.post("/login", validSchema(userSchema), loginUser);

export default authRouter;

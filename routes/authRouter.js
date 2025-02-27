import express from "express";

import { login, registerUser } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { createUserSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrlWrapper(registerUser));

authRouter.post("/login", validateBody(createUserSchema), ctrlWrapper(login));


export default authRouter;

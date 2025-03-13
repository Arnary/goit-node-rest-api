import express from "express";

import { getCurrentUser, login, logout, register, updateAvatar, updateSubscription } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { createUserSchema, updateSubscriptionSchema, updateAvatarSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import uploadAvatar from "../middlewares/uploadAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), ctrlWrapper(register));

authRouter.post("/login", validateBody(createUserSchema), ctrlWrapper(login));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrentUser));

authRouter.patch("/subscription", authenticate, validateBody(updateSubscriptionSchema), ctrlWrapper(updateSubscription));

authRouter.patch("/avatars", authenticate, uploadAvatar.single("avatarURL"), validateBody(updateAvatarSchema), ctrlWrapper(updateAvatar));

export default authRouter;

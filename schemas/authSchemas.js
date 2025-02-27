import Joi from "joi";
import { emailRegex } from "../constants/userConstants.js";

export const createUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
})

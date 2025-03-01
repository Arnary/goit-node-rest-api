import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContactById,
  updateContactFavorite,
} from "../controllers/contactsControllers.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), ctrlWrapper(updateContactById));

contactsRouter.patch("/:id/favorite", isEmptyBody, validateBody(updateFavoriteSchema), ctrlWrapper(updateContactFavorite));

export default contactsRouter;

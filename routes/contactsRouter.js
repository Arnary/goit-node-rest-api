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

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), ctrlWrapper(updateContactById));

contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), ctrlWrapper(updateContactFavorite));

export default contactsRouter;

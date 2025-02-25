import HttpError from "../helpers/HttpError.js";
import { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const result = await listContacts();

    res.json(result);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

export const createContact = async (req, res) => {
    const result = await addContact(req.body);

    res.status(201).json(result);
};

export const updateContactById = async (req, res) => {
    const { id } = req.params;
    const emptyBody = obj => Object.keys(obj).length === 0;
    if (emptyBody(req.body)) {
        throw HttpError(400, "Body must have at least one field")
    }

    const result = await updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

export const updateContactFavorite = async (req, res) => {
    const { id } = req.params;
    
    const result = await updateStatusContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

import HttpError from "../helpers/HttpError.js";
import { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } from "../services/contactsServices.js";
import getPagination from "../helpers/getPagination.js";


export const getAllContacts = async (req, res) => {
    const { favorite, page, limit: size } = req.query;
    const { id: owner } = req.user;

    const { limit, offset } = getPagination(page, size);

    const result = await listContacts({favorite, limit, offset, owner});

    res.json(result);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const result = await getContactById({id, owner});
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const contact = await getContactById({ id, owner });
    const result = await removeContact({ id, owner });
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(contact);
};

export const createContact = async (req, res) => {
    const { id: owner } = req.user;
    const result = await addContact({...req.body, owner});

    res.status(201).json(result);
};

export const updateContactById = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;

    const result = await updateContact({id, owner}, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

export const updateContactFavorite = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    
    const result = await updateStatusContact({id, owner}, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result);
};

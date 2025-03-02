import Contacts from "../db/models/Contacts.js";

export const listContacts = async query => {
  const { favorite, limit, offset, owner } = query;
  if (!favorite) {
    return await Contacts.findAll({ order: ["id"], limit, offset, where: {owner} });
  }
  return await Contacts.findAll({ order: ["id"], limit, offset, where: {owner, favorite} });
};

export const getContactById = query => Contacts.findOne({where: query});

export const removeContact = query => Contacts.destroy({where: query});

export const addContact = data => Contacts.create(data);

export const updateContact = async (query, data) => {
  const contact = await getContactById(query);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const updateStatusContact = async (query, body) => { 
  const contact = await getContactById(query);
  if (!contact) return null;

  return contact.update(body, {
    returning: true,
  });
};

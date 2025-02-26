import Contacts from "../db/models/Contacts.js";

export const listContacts = () => Contacts.findAll();

export const getContactById = contactId => Contacts.findByPk(contactId);

export const removeContact = contactId => Contacts.destroy({
  where: {
    id: contactId,
  }
});

export const addContact = data => Contacts.create(data);

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const updateStatusContact = async (contactId, body) => { 
  const contact = await getContactById(contactId);
  if (!contact) return null;

  return contact.update(body, {
    returning: true,
  });
};

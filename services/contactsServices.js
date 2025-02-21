import fs from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
};

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null
};

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
};

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

export async function updateContact(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

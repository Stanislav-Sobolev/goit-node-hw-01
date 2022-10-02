const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const getContacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(getContacts);
}

async function getContactById(contactId) {
  const idStringified = contactId.toString();
  const getAll = await listContacts();

  const findContact = await getAll.find((el) => el.id === idStringified);
  if (findContact === undefined) {
    return null;
  }

  return findContact;
}

async function removeContact(contactId) {
  const idStringified = contactId.toString();
  const getAll = await listContacts();
  const findIndexContact = await getAll.findIndex(
    (el) => el.id === idStringified
  );

  if (findIndexContact === -1) {
    return null;
  }

  const [removedContact] = getAll.splice(findIndexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const dataNewContact = { id: nanoid(), name, email, phone };
  const getAll = await listContacts();

  getAll.push(dataNewContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));

  return dataNewContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

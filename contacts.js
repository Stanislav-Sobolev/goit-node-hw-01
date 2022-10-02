const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const getContacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(getContacts);
}

async function getContactById(contactId) {
  const getAll = await listContacts();

  const findContact = await getAll.find((el) => el.id === contactId);

  console.log("findContact", findContact);
  return findContact;
}

async function removeContact(contactId) {
  const getAll = await listContacts();
  const findContact = await getAll.findIndex((el) => el.id === contactId);

  if (findContact === -1) {
    return null;
  }

  const [removedContact] = getAll.splice(findContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));

  console.log("removedContact", removedContact);
  return removedContact;
}

async function addContact(name, email, phone) {
  const dataNewContact = { id: nanoid(), name, email, phone };
  const getAll = await listContacts();

  await getAll.push(dataNewContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));

  console.log("getAll", getAll);
  return;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

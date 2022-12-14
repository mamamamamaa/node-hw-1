const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs
      .readFile(contactsPath)
      .catch((e) => console.error(e.message));
    return JSON.parse(data.toString());
  } catch ({ message }) {
    return message;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find(({ id }) => contactId.toString() === id);
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const newContacts = contacts.filter(({ id }) => id !== contactId.toString());

  const result = JSON.stringify(newContacts);

  await fs
    .writeFile(contactsPath, result)
    .catch((e) => console.error(e.message));

  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  let id;

  while (true) {
    id = Math.round(Math.random() * 100);
    if (!(await getContactById(id))) {
      break;
    }
  }

  const newContacts = [...contacts, { id, name, email, phone }];
  const result = JSON.stringify(newContacts);

  await fs
    .writeFile(contactsPath, result)
    .catch((e) => console.error(e.message));

  return newContacts;
}

module.exports = {
  getContactById,
  listContacts,
  addContact,
  removeContact,
};

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize('./db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath).catch(e => console.error(e.message));
    return JSON.parse(data.toString());
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    return contacts.find(({id}) => contactId.toString() === id);
}

async function removeContact(contactId) {
    const contacts = await listContacts();

    const newContacts = JSON.stringify(contacts.filter(({id}) => id !== contactId.toString()));

    await fs.writeFile(contactsPath, newContacts).catch(e => console.error(e.message));
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();

    let id;

    while (true){
        id = Math.round(Math.random()*100);
        if(!await getContactById(id)){
            break;
        }
    }

    const newContacts = JSON.stringify([...contacts, {id, name, email, phone}])

    await fs.writeFile(contactsPath, newContacts).catch(e => console.error(e.message));
}

module.exports = {
    getContactById, listContacts, addContact, removeContact
}
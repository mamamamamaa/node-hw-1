const {
  listContacts,
  removeContact,
  addContact,
  getContactById,
} = require("./contacts");

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listResult = await listContacts();
      console.log(listResult);
      break;

    case "get":
      const getResult = await getContactById(id);
      console.log(getResult);
      break;

    case "add":
      const addResult = await addContact(name, email, phone);
      console.log(addResult);
      break;

    case "remove":
      const removeResult = await removeContact(id);
      console.log(removeResult);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

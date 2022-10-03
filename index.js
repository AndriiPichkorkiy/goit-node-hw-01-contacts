const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(process.argv)
  .alias("a", "action")
  .alias("id", "id")
  .alias("n", "name")
  .alias("e", "email")
  .alias("ph", "phone").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("contact", contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("contact was added", newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact === null) {
        return console.log("there isn't any contact with id:", id);
      }

      console.log("contact was removed", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// console.log("argv", argv);

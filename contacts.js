const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log("contactsPath", contactsPath);

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const dbContacts = await listContacts();
  const contact = dbContacts.find(({ id }) => {
    return contactId === +id;
  });
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const dbContacts = await listContacts();
  const contactIndex = dbContacts.findIndex(({ id }) => contactId === +id);

  if (contactIndex === -1) return null;

  const removedContact = dbContacts.splice(contactIndex, 1)[0];
  updateContacts(dbContacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: uniqid.time(), name, email, phone };
  const isValidated = validate(newContact);
  if (!isValidated) return console.log("Wrong data!");

  const dbContacts = await listContacts();
  updateContacts([...dbContacts, newContact]);
  return newContact;
}

//function for rewrite contacts.json
function updateContacts(contacts) {
  const contactsJson = JSON.stringify(contacts, null, 2);
  fs.writeFile(contactsPath, contactsJson);
}

//function for validate data
function validate({ name, email, phone }) {
  const validateName = !!name;
  const validateEmail = email.includes("@");
  const validatePhone = !!phone;
  return validateName && validateEmail && validatePhone;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

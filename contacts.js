const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");
// уникнете повторення блоку try...catch у кожній функції за допомогою
// допоміжних функцій: readContactsFile() та writeContactsFile()
async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error("помилка при зчитуванні файлу контактів.");
  }
}

async function writeContactsFile(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw new Error("Помилка при записі у файл контактів.");
  }
}
/////////////////////////////////////////////////////////////////////////
async function listContacts() {
  try {
    return await readContactsFile();
    // const data = await fs.readFile(contactsPath);
    // return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContactsFile();
    // const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContactsFile();
    // const contacts = await listContacts();
    const indexContact = contacts.findIndex((item) => item.id === contactId);
    if (indexContact === -1) {
      return null;
    }
    const [delContact] = contacts.splice(indexContact, 1);
    await writeContactsFile(contacts);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return delContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    // const contacts = await listContacts();
    const contacts = await readContactsFile();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

import { readFile, writeFile } from "node:fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const fetchContacts = async () => {
  try {
    const contacts = await readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const writeContactsData = async (contacts) => {
  try {
    const stringifyContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, stringifyContacts);
  } catch (error) {
    console.log(error.message);
  }
};

export const listContacts = async () => {
  try {
    const contacts = await fetchContacts();
    console.table(contacts);
    return;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const item = contacts.find((contact) => contact.id === contactId);
    if (!item) {
      console.log("This contact doesn't exist");
      return;
    }
    console.log("Found contact:", item);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeContactsData(filteredContacts);
    console.log("You removed contact");
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    contacts.push(newContact);
    await writeContactsData(contacts);
    console.log(`You added new contact - ${JSON.stringify(newContact)}!`);
  } catch (error) {
    console.log(error.message);
  }
};

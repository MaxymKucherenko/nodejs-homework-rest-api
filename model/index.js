const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('model', './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(
    (item) => item.id === contactId || JSON.stringify(item.id) === contactId
  )
  if (idx === -1) {
    return null
  }
  return contacts[idx]
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(
    (item) => item.id === contactId || JSON.stringify(item.id) === contactId
  )
  if (idx === -1) {
    return null
  }
  const removeContact = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removeContact
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newId = contacts.length + 1
  const newContact = { id: newId, ...body }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(
    (item) => item.id === contactId || JSON.stringify(item.id) === contactId
  )
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, id: contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

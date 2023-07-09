// *
import React, { useEffect, useState } from 'react';
import Section from './Section/Section';
import ContactForm from './Contact-form/Contact-form';
import Filter from './FIlter/Filter';
import ContactsList from './Contact-list/Contact-list';
import Notification from './Notification/Notification';
// ? // Ключ сховища ;
const STORAGE_KEY = 'contacts';
// ? // Масив контактів який перевіряє наявність та отримує контакти із local storage ;
let loadedContactsArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
// ? // Кoмпонент App ;
const App = () => {
  const [contacts, setContacts] = useState(loadedContactsArray);
  let [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts !== loadedContactsArray) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
    if (contacts.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    }
  });
  const onContactAdding = contactData => {
    if (contacts.find(contact => contact.name === contactData.name)) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, contactData]);
  };
  const onContactRemoving = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };
  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();
  return (
    <div className="App">
      <Section title="Phonebook">
        <ContactForm onContactAdding={onContactAdding}></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onFilterChange={onFilterChange}></Filter>
        {contacts.length > 0 ? (
          <ContactsList
            contactsData={filteredContacts}
            onContactRemoving={onContactRemoving}
          ></ContactsList>
        ) : (
          <Notification message="There is no contacts"></Notification>
        )}
      </Section>
    </div>
  );
};
export default App;

import React, { useState } from 'react';
import propTypes from 'prop-types';
import css from './Contact-form.module.css';
import { nanoid } from 'nanoid';
const ContactForm = ({ onContactAdding }) => {
  let [name, setName] = useState('');
  let [number, setNumber] = useState('');
  const handleInputChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value.trim());
    } else if (event.target.name === 'number') {
      setNumber(event.target.value.trim());
    }
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    const contact = {
      name: name,
      number: Number.parseInt(number),
      id: nanoid(),
    };
    onContactAdding(contact);
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <label className={css.label}>
        <h2 className={css.title}>Name</h2>
        <input
          className={css.input}
          onChange={handleInputChange}
          maxLength={20}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        ></input>
      </label>
      <label className={css.label}>
        <h2 className={css.title}>Number</h2>
        <input
          className={css.input}
          onChange={handleInputChange}
          maxLength={20}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
ContactForm.propTypes = {
  onContactAdding: propTypes.func.isRequired,
};
export default ContactForm;

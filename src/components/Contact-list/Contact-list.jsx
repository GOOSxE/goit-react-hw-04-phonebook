import React from 'react';
import propTypes from 'prop-types';
import css from './Contact-list.module.css';
const Contactslist = ({ contactsData, onContactRemoving }) => (
  <ul className={css.list}>
    {contactsData.map(contact => (
      <li className={css.list_item} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.button}
          onClick={() => onContactRemoving(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
Contactslist.propTypes = {
  contactsData: propTypes.array.isRequired,
  onContactRemoving: propTypes.func.isRequired,
};
export default Contactslist;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../../redux/myPhoneBook/contacts/contactsSlice';
import { getFilteredContacts } from '../../../redux/myPhoneBook/contacts/contacts-selectors';

import css from './PhoneBookForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const TEXT_PATTERN =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

const PHONE_PATTERN =
  '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

const PhoneBookForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();
  const contactData = { ...state };

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const currentNumber = item.number;
      return (
        normalizedCurrentName === normalizedName || currentNumber === number
      );
    });

    return Boolean(dublicate);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value.trim(),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isDublicate(contactData)) {
      return alert(
        `Contact with name ${contactData.name} and number ${contactData.number} already in list`
      );
    }
    dispatch(addContact(contactData));
    reset();
  };

  const reset = () => {
    setState({ ...INITIAL_STATE });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          className={css.input}
          pattern={TEXT_PATTERN}
          name="name"
          onChange={handleChange}
          value={state.name}
          required
        ></input>
      </label>
      <label className={css.label}>
        Number
        <input
          type="phone"
          className={css.input}
          pattern={PHONE_PATTERN}
          name="number"
          onChange={handleChange}
          value={state.number}
          required
        ></input>
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default PhoneBookForm;

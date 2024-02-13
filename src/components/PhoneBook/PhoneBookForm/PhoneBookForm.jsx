import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../../redux/myPhoneBook/contacts/contacs-operations';

import css from './PhoneBookForm.module.css';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

const TEXT_PATTERN =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

const PHONE_PATTERN =
  '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

const PhoneBookForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const dispatch = useDispatch();
  const contactData = { ...state };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value.trim(),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
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
          name="phone"
          onChange={handleChange}
          value={state.phone}
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

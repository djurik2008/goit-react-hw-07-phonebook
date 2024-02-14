import css from './PhoneBookList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/myPhoneBook/contacts/contacs-operations';
import { selectFilteredContacts } from '../../../redux/myPhoneBook/contacts/contacts-selectors';
import Loader from 'components/Loader/Loader';

const PhoneBookList = () => {
  const { items, isLoading, error } = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const elements = items.map(({ id, name, phone }) => (
    <li key={id} className={css.item}>
      {name}: {phone}
      <button
        type="button"
        onClick={() => dispatch(deleteContact(id))}
        className={css.buttonDel}
      >
        {isLoading === id ? <Loader /> : 'Delete'}
      </button>
    </li>
  ));
  return (
    <div>
      {isLoading === 'fetch' && <Loader />}
      {error && <p>{error}</p>}
      {Boolean(items.length) && <ul className={css.list}>{elements}</ul>}
    </div>
  );
};

export default PhoneBookList;

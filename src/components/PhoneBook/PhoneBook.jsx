import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/myPhoneBook/contacts/contacs-operations';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import PhoneBookList from './PhoneBookList/PhoneBookList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';

const PhoneBook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  return (
    <div>
      <PhoneBookForm />
      <PhoneBookFilter />
      <PhoneBookList />
    </div>
  );
};

export default PhoneBook;

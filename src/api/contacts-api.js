import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://65c89c6da4fbc162e111ee06.mockapi.io/api/contacts',
});

export const getContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const addContact = async body => {
  const { data } = await contactsInstance.post('/', body);
  return data;
};

export const removeContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};

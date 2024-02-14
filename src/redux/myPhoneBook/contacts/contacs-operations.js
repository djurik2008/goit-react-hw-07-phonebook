import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from '../../../api/contacts-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await contactsApi.getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (body, { rejectWithValue }) => {
    try {
      const data = await contactsApi.addContact(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({ name, phone }, { getState }) => {
      const { contacts } = getState();
      const normalizedName = name.toLowerCase();

      const dublicate = contacts.items.find(item => {
        const normalizedCurrentName = item.name.toLowerCase();
        const currentPhone = item.phone;
        return (
          normalizedCurrentName === normalizedName || currentPhone === phone
        );
      });

      if (dublicate) {
        alert(`Contact with name ${name} and number ${phone} already in list`);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await contactsApi.removeContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

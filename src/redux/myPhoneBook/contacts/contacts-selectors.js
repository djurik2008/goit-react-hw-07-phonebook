import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/filter.selectors';

const selectAllContacts = store => store.contacts;

export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectFilter],
  (contacts, filter) => {
    const { items, isLoading, error } = contacts;
    if (!filter) {
      return { items: items, isLoading, error };
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = items.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      return (
        normalizedName.includes(normalizedFilter) ||
        phone.includes(normalizedFilter)
      );
    });
    return { items: filteredContacts, isLoading, error };
  }
);

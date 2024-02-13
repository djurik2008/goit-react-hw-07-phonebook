export const selectFilteredContacts = store => {
  const { contacts, filter } = store;
  const { items, isLoading, error } = contacts;
  if (!filter) {
    return contacts;
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
};

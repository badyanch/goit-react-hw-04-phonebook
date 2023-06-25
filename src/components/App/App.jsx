import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'hooks';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { GlobalStyle } from 'components/GlobalStyle';
import { getNormalizedName } from 'utils';
import { storageKeys } from 'constants';
import * as S from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(
    storageKeys.DATA_CONTACTS_LS_KEY,
    []
  );
  const [filter, setFliter] = useState('');

  const handleChangeFilter = e => {
    const { value } = e.target;

    setFliter(value);
  };

  const handleAddContact = ({ name, number }) => {
    const normalizedName = getNormalizedName(name);

    if (contactValidationByName(normalizedName)) {
      alert(`${normalizedName} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name: normalizedName, number };

    setContacts(prevState => [...prevState, newContact]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactValidationByName = newName => {
    return contacts.some(({ name }) => name === newName);
  };

  const visibleContacts = getVisibleContacts();

  return (
    <S.Container>
      <GlobalStyle />

      <S.PrimaryTitle>Phonebook</S.PrimaryTitle>
      <ContactForm onSubmit={handleAddContact} />

      <S.SecondaryTitle>Contacts</S.SecondaryTitle>
      <Filter value={filter} onChangeFilter={handleChangeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={handleDeleteContact}
      />
    </S.Container>
  );
};

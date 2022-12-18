import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteContact, getContacts } from '../../API/contacts';
import { ContactWithId } from '../../types/Contact';
import { Loader } from '../Loader';
import { PageNotFound } from '../PageNotFound';
import { Table } from '../Table';
import './PhoneBook.css';

export const PhoneBook: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [contacts, setContacts] = useState<ContactWithId[]>([]);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const dataFromApi = await getContacts();

      setContacts(dataFromApi);
    } catch (error) {
      setIsError(true);
    }
  
    setIsLoading(false);
  }

  const handleContactDelete = async (contactId: number) => {

    try {
      await deleteContact(contactId);

      loadData();
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {isLoading && !isError && <Loader />}
      {!isLoading && !isError && <div className="phone-book__main-content">
        <div className="phone-book__subheader">
          <h4 className="phone-book__title">Contacts</h4>

          <Link
            to="form"
            className="button is-link"
          >
            Add Contact
          </Link>
        </div>

        
        <Table
          handleContactDelete={handleContactDelete}
          contacts={contacts}
        />
      </div>}
      {isError && <PageNotFound />}
    </>

  )
}

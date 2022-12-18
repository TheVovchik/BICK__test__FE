import { FC, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getContact, patchContact, postContact } from '../../API/contacts';
import { Contact, ContactWithId, Multi } from '../../types/Contact';
import { MultiField } from '../../types/MultiFieldEnum';
import { SingleField } from '../../types/SingleFieldEnum';
import {  MultipleField } from './MultipleField';
import './Form.css';
import { FormField } from './FormField';
import { v4 as uuidv4 } from 'uuid';
import { AtLeastOneLetter } from '../../utils/AtLeastOneLetter';
import { EmailPattern } from '../../utils/EmailPattern';
import { NumberPattern } from '../../utils/NumberPattern';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { PageNotFound } from '../PageNotFound';

const emptyObject = {
  id: '1',
  value: '',
}

export const Form: FC = () => {
  const [contact, setContact] = useState<ContactWithId | null>(null)
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [emails, setEmails] = useState<Multi[]>([emptyObject]);
  const [numbers, setNumbers] = useState<Multi[]>([emptyObject]);
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const loadContact = async (contactId: string) => {
    setIsLoading(true);

    try {
      const contact = await getContact(contactId);

      setContact(contact);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    const contactId = location.pathname.slice(1).split('/')[1];

    if (contactId) {
      loadContact(contactId);
    }
  }, []);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setLastName(contact.lastName);
      setAddress(contact.address);
      setCity(contact.city);
      setCountry(contact.country);
      setEmails(contact.emails);
      setNumbers(contact.numbers);
    }
  }, [contact])

  const handleInputChange = (
    value: string,
    field: SingleField,
  ) => {
    switch (field) {
      case SingleField.NAME:
        setName(value);
        break;

      case SingleField.LASTNAME:
        setLastName(value);
        break;

      case SingleField.ADDRESS:
        setAddress(value);
        break;
  
      case SingleField.CITY:
        setCity(value);
        break;
      
      case SingleField.COUNTRY:
        setCountry(value);
        break;

      default:
        return;
    }

    setIsFormCorrect(false);
  };

  const handleMultiFieldInput = (
    field: MultiField, newValue: string, id: string
  ) => {
    switch (field) {
      case MultiField.EMAIL: {
        setEmails(curr => {
          const newList = [...curr];
  
          return newList.map(email => {
            if (email.id === id) {
              return {
                ...email,
                value: newValue,
              }
            }
  
            return email;
          });
        });
        break;
      }
      
      case MultiField.NUMBER: {
        setNumbers(curr => {
          return [...curr].map(number => {
            if (number.id === id) {
              return {
                ...number,
                value: newValue,
              }
            }
      
            return number;
          });
        });
      };
      break;

      default:
        return;
    }

    setIsFormCorrect(false);
  };

  const handleInputFieldAdd = (field: MultiField) => {
    switch (field) {
      case MultiField.EMAIL: {
        setEmails(curr => {
          const newList = [...curr];
          const newEmailField = {
            id: uuidv4(),
            value: '',
          };
  
          newList.push(newEmailField);
  
          return newList;
        });
        break;
      }
      
      case MultiField.NUMBER: {
        setNumbers(curr => {
          const newList = [...curr];
          const newNumberField = {
            id: uuidv4(),
            value: '',
          };
    
          newList.push(newNumberField);
    
          return newList;
        });
      };
      break;

      default:
        return;
    }
  }

  const handleInputFieldRemove = (
    field: MultiField, removedId: string,
  ) => {
    switch (field) {
      case MultiField.EMAIL: {
        setEmails(curr => {
          const filtredEmails = curr.filter(({id}) => id !== removedId);
  
          return filtredEmails;
        });
        break;
      }
      
      case MultiField.NUMBER: {
        setNumbers(curr => {
          const filtredNumbers = curr.filter(({id}) => id !== removedId);
    
          return filtredNumbers;
        });
      };
      break;

      default:
        return;
    }
  };

  const checkForm = (data: Contact) => {
    return Object.entries(data)
      .map(([field, values]) => {
        switch (field) {
          case 'name':
          case 'lastName':
          case 'address':
          case 'city':
          case 'country':
            return AtLeastOneLetter.test(values);

          case 'emails':
            return values
              .map((multi: Multi) => EmailPattern.test(multi.value))
              .every((multi: boolean) => multi);

          case 'numbers':
            return values
              .map((multi: Multi) => NumberPattern.test(multi.value))
              .every((multi: boolean) => multi);
          
          default:
            return true;
        } 
      })
      .every((value: boolean) => value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newContact = {
      name,
      lastName,
      address,
      city,
      country,
      emails,
      numbers,
    }

    const isValid = checkForm(newContact);

    if (isValid) {
      if (contact) {
        await patchContact(contact.id, newContact);
      } else {
        await postContact(newContact);
      }

      navigate('/home');

      return;
    }

    setIsFormCorrect(true);
  };

  return (
    <>
      <div className='wrapper'>
        <Link
          to='/home'
          className='button is-warning button-back'
        >
          Go back
        </Link>
        {isLoading && !isError && <Loader />}
        {!isLoading && !isError && <form
          className="form"
          onSubmit={handleSubmit}
        >
          <FormField
            type={SingleField.NAME}
            value={name}
            placeholder='Enter the Name'
            label="Name:"
            handleInputChange={handleInputChange}
          />

          <FormField
            type={SingleField.LASTNAME}
            value={lastName}
            placeholder='Enter Last Name'
            label="Last Name:"
            handleInputChange={handleInputChange}
          />

          <FormField
            type={SingleField.ADDRESS}
            value={address}
            placeholder='Enter Address'
            label="Address:"
            handleInputChange={handleInputChange}
          />

          <FormField
            type={SingleField.CITY}
            value={city}
            placeholder='Enter city'
            label="City:"
            handleInputChange={handleInputChange}
          />

          <FormField
            type={SingleField.COUNTRY}
            value={country}
            placeholder='Enter country'
            label="Country:"
            handleInputChange={handleInputChange}
          />

          <label className="label">Email:</label>
          {emails.map((email, index) => {
            const isLast = index === emails.length - 1;

            return (
              <MultipleField
                key={email.id}
                field={MultiField.EMAIL}
                type='email'
                placeholder='Enter Email'
                isLast={isLast}
                data={email}
                handleInputFieldRemove={handleInputFieldRemove}
                handleInputFieldAdd={handleInputFieldAdd}
                handleMultiFieldInput={handleMultiFieldInput}
              />
            )
          })}

          <label className="label">Number:</label>
          {numbers.map((number, index) => {
            const isLast = index === numbers.length - 1;

            return (
              <MultipleField
                key={number.id}
                field={MultiField.NUMBER}
                type='text'
                placeholder='Enter Number'
                isLast={isLast}
                data={number}
                handleInputFieldRemove={handleInputFieldRemove}
                handleInputFieldAdd={handleInputFieldAdd}
                handleMultiFieldInput={handleMultiFieldInput}
              />
            )
          })}

          <button className="button is-link">Save</button>
          {isFormCorrect
              && (
          <p className="has-text-danger">
            Please fill all fields with correct data
          </p>)}
        </form>}
      </div>
      {isError && <PageNotFound />}
    </>
  )
}

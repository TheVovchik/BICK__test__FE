import { FC } from 'react';
import { ContactWithId } from '../../../types/Contact';
import { Link } from 'react-router-dom';

type Props = {
  handleContactDelete: (contactId: number) => void
  contacts: ContactWithId[],
};

export const Tbody: FC<Props> = ({ handleContactDelete, contacts }) => {
    return (
    <tbody>
      {contacts.map(({
        id, name, lastName, address, city, country, emails, numbers
        }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{address}</td>
            <td>{city}</td>
            <td>{country}</td>
            <td>
              {emails.map(({id, value}) => <p key={id}>{value}</p>)}
            </td>
            <td>
              {numbers.map(({id, value}) => <p key={id}>{value}</p>)}
            </td>
            <td>
              <Link
                to={`form/${id}`}
                className="button is-success"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type='button'
                className="button is-danger"
                onClick={() => handleContactDelete(id)}
              >
                Delete
              </button>
            </td>
          </tr>
      ))}
    </tbody>
  )
}

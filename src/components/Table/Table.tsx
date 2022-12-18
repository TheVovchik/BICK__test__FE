import { FC } from 'react';
import { ContactWithId } from '../../types/Contact';
import './Table.css';
import { Tbody } from './Tbody';

type Props = {
  handleContactDelete: (contactId: number) => void
  contacts: ContactWithId[],
};

export const Table: FC<Props> = ({ handleContactDelete, contacts }) => {
  return (
    <table className="
      phone-book__table
      table is-bordered
      is-striped
      is-narrow
      is-hoverable
      is-fullwidth"
    >
      <thead className="table__head">
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Country</th>
          <th>Email</th>
          <th>Number</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <Tbody
        handleContactDelete={handleContactDelete}
        contacts={contacts}
      />
    </table>
  )
}

import React from 'react';
import type { Contact } from './types';
import ContactRow from './ContactRow';

interface Props {
  contacts: Contact[];
  onView: (contact: Contact) => void;
  onDelete: (id: number) => void;
}
const ContactTable: React.FC<Props> = ({ contacts, onView, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Full Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Subject</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactRow 
              key={contact.id} 
              contact={contact} 
              onView={onView} 
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContactTable;
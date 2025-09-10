import React from 'react';
import type { Contact } from './types';

interface Props {
  contact: Contact;
  onView: (contact: Contact) => void;
  onDelete: (id: number) => void;
}
const ContactRow: React.FC<Props> = ({ contact, onView, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4">{contact.full_name}</td>
      <td className="py-2 px-4">{contact.email}</td>
      <td className="py-2 px-4">{contact.subject}</td>
      <td className="py-2 px-4">{contact.phone}</td>
      <td className="py-2 px-4 space-x-2">
        <button onClick={() => onView(contact)} className="text-blue-500 underline">View</button>
        <button onClick={() => onDelete(contact.id)} className="text-red-500 underline">Delete</button>
      </td>
    </tr>
  );
};
export default ContactRow;
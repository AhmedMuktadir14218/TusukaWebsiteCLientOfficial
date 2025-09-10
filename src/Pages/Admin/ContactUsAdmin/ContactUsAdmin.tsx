import React, { useEffect, useState } from 'react';
import ContactTable from './ContactTable';
import ContactDetailsModal from './ContactDetailsModal';
import type { Contact, ContactApiResponse } from './types';

const API_URL = "http://localhost/TusukaWebServerV6/api/contacts";

const ContactUsAdmin: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: ContactApiResponse = await response.json();
      setContacts(data.data.data); // data.data.data as shown in your API response
    } catch (error) {
      // Handle error accordingly
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm('Are you sure you want to delete this contact?')) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onView = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Us Admin</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ContactTable 
          contacts={contacts} 
          onView={onView} 
          onDelete={handleDelete}
        />
      )}
      <ContactDetailsModal 
        contact={selectedContact} 
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
};
export default ContactUsAdmin;
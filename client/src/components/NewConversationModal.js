import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleCheckBoxChange = (contactId) => {
    setSelectedContactsIds((prevSelectedContactIds) => {
      // remove from the list
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => contactId !== prevId);
        // add to the list
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactsIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton> Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;

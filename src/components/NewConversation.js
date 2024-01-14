import React, { useState } from "react";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversation({ closeModal }) {
  const { createConversation } = useConversations();
  const { contacts } = useContacts();
  const [selection, setSelection] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selection);
    closeModal();
  };

  const handleCheckChange = (contactId) => {
    setSelection((prevSelection) => {
      if (prevSelection.includes(contactId)) {
        return prevSelection.filter((prevId) => prevId !== contactId);
      } else {
        return [...prevSelection, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton={closeModal}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {contacts.map((contact, index) => (
              <FormGroup>
                <Form.Check
                  type="checkbox"
                  key={index}
                  value={selection.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckChange(contact.id)}></Form.Check>
              </FormGroup>
            ))}
            <Button className="mt-2" type="submit">
              Create conversation
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </>
  );
}

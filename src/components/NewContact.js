import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContact({ closeModal }) {
  console.log(useContacts());
  const { createContact } = useContacts();
  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  const idRef = useRef();
  const nameRef = useRef();
  return (
    <>
      <Modal.Header closeButton={closeModal}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" ref={idRef} required></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Button className="mt-2" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </>
  );
}

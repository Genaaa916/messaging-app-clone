/* eslint-disable import/no-anonymous-default-export */
import React, { useRef } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Login({ onIdSubmit }) {
  const idRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const CreateNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container
      className="justify-content-center align-items-center d-flex"
      style={{ height: "100vh" }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-2 me-2">
          Login
        </Button>
        <Button onClick={CreateNewId} className="mt-2" variant="secondary">
          Create New ID
        </Button>
      </Form>
    </Container>
  );
}

import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");

  const { sendMessage, selection } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selection.receiver.map((receiver) => receiver.id),
      text
    );
  };
  return (
    <div className="px-2 d-flex flex-column flex-grow-1">
      <div className=" overflow-auto flex-grow-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        voluptatibus omnis ea, blanditiis dolorum obcaecati nobis, autem
        quisquam nemo adipisci voluptates exercitationem recusandae? Omnis neque
        facere inventore veritatis eos dolore.
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}></Form.Control>
            <Button>Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

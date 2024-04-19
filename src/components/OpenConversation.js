import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");

  const { sendMessage, selectedConversations } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedConversations);
    sendMessage(
      selectedConversations.receivers.map((receiver) => receiver.id),
      text
    );
    setText("");
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && text.trim() !== "") {
                  handleSubmit(e);
                }
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                height: "75px",
                resize: "none",
                marginRight: "10px",
              }}></Form.Control>
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

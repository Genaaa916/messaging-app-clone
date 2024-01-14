import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  console.log("CONVOS", conversations);

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          action
          onClick={() => selectConversationIndex(index)}
          key={index}
          active={conversation.selected}>
          {conversation.receivers.map((receiver) => receiver.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

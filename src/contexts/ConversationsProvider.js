import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const createConversation = (id, name) => {
    setConversations((existing) => {
      return [...existing, { id, name }];
    });
  };

  const formattedConversations = conversations.map((conversation) => {
    const receivers = conversation.receiver.map((receiver) => {
      const contact = contacts.find((contact) => contact.id === receiver);
      const name = (contact && contact.name) || receiver;
      return { id: receiver, name };
    });
    return { ...conversation, receivers };
  });

  return (
    <ConversationsContext.Provider
      value={{ conversations: formattedConversations, createConversation }}>
      {children}
    </ConversationsContext.Provider>
  );
}

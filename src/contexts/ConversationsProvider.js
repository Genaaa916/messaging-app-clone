import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [selectionIndex, setSelectionIndex] = useState(0);
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const createConversation = (receivers) => {
    setConversations((existing) => {
      const conversationExists = existing.some((conversation) =>
        arrayEquals(conversation.receivers, receivers)
      );

      return conversationExists
        ? existing
        : [...existing, { receivers, messages: [] }];
    });
  };

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const receivers = conversation.receivers.map((receiver) => {
      const contact = contacts.find((contact) => contact.id === receiver);
      const name = (contact && contact.name) || receiver;
      return { id: receiver, name };
    });
    const selected = index === selectionIndex;
    return { ...conversation, receivers, selected };
  });

  const exportsValue = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectionIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={exportsValue}>
      {children}
    </ConversationsContext.Provider>
  );
}

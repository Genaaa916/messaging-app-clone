import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

// react context for managing conversations
const ConversationsContext = React.createContext();

// hook for accessing the conversations context
export function useConversations() {
  return useContext(ConversationsContext);
}

// provider component for conversations
export function ConversationsProvider({ children }) {
  const [selectionIndex, setSelectionIndex] = useState(0); // Index of the currently selected conversation
  const { contacts } = useContacts(); // Access contacts from ContactsProvider
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    [] // init state for conversations
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

  const addMessageToConversation = () => {};

  const sendMessage = (receivers, message) => {};

  // format conversations to include receiver names and selected state
  const formattedConversations = conversations.map((conversation, index) => {
    const receivers = conversation.receivers.map((receiver) => {
      // find contact name for each receiver, default to receiver ID if not found
      const contact = contacts.find((contact) => contact.id === receiver);
      const name = (contact && contact.name) || receiver;
      return { id: receiver, name };
    });
    // mark conversation as selected if it matches the current selection index
    const selected = index === selectionIndex;
    return { ...conversation, receivers, selected };
  });

  // object to be provided to the context's consumers
  const exportsValue = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectionIndex, // Function to change the selected conversation
    createConversation,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={exportsValue}>
      {children}
    </ConversationsContext.Provider>
  );
}

// check if two arrays are equal
const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

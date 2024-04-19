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
export function ConversationsProvider({ id, children }) {
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

  const addMessageToConversation = ({ receivers, text, sender }) => {
    let changed = false;
    setConversations((prevConversations) => {
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquals(conversation.receivers, receivers)) {
          changed = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      return changed
        ? newConversations
        : [...prevConversations, { receivers, messages: [newMessage] }];
    });
  };

  const sendMessage = (receivers, message) => {
    addMessageToConversation({ receivers, text: message, sender: id });
  };

  // format conversations to include receiver names and selected state
  const formattedConversations = conversations.map((conversation, index) => {
    const receivers = conversation.receivers.map((receiver) => {
      // find contact name for each receiver, default to receiver ID if not found
      const contact = contacts?.find((contact) => contact.id === receiver);
      const name = (contact && contact.name) || receiver;
      return { id: receiver, name };
    });
    const messages = conversation.messages.map((message) => {
      const contact = contacts?.find(
        (contact) => contact.id === message.sender
      );
      const name = (contact && contact.name) || "";
      const fromMe = id === message.sender;
      console.log("this", { ...message, senderName: name, fromMe });
      return { ...message, senderName: name, fromMe };
    });
    // mark conversation as selected if it matches the current selection index
    const selected = index === selectionIndex;
    return { ...conversation, receivers, selected };
  });

  // object to be provided to the context's consumers
  const exportsValue = {
    conversations: formattedConversations,
    selectedConversations: formattedConversations[selectionIndex],
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

import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// react context for managing contacts
const ContactsContext = React.createContext();

// custom hook for accessing the contacts context
export function useContacts() {
  return useContext(ContactsContext);
}

// provider component to wrap around the part of the app that needs access to contacts
export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((existing) => {
      const contacts = existing || [];
      return [...contacts, { id, name }];
    });
  };

  // context provider passes contacts and createcontact function to its children
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

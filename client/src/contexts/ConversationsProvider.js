import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );

  const { contacts } = useContacts();

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
    //     alert(id, name);
  };

  const formatedConversations = conversations.map((conversation) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    return { ...conversation, recipients };
  });

  const value = {
    conversations: formatedConversations,
    createConversation,
  };

  return (
    //   this implies that both contacts and createContact are available everywhere in the app
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

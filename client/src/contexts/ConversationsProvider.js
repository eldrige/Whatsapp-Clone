import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] =
    React.useState(0);

  const { contacts } = useContacts();

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
    //     alert(id, name);
  };
  // can take our own messages, and those of other people
  const addMessageToConversation = ({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });
      // if we didnt have a conversation that match
      if (madeChange) {
        return newConversations;
      } else {
        return [
          ...prevConversations,
          {
            recipients,
            messages: [newMessage],
          },
        ];
      }
    });
  };

  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formatedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, sender: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, recipients, selected, messages };
  });

  const value = {
    conversations: formatedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formatedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
  };

  return (
    //   this implies that both contacts and createContact are available everywhere in the app
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};

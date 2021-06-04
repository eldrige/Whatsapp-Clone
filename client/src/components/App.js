import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [id, setid] = useLocalStorage('id');

  const dashboard = (
    <Container>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </Container>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setid} />}</>;
}

export default App;

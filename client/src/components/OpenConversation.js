import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

const OpenConversation = () => {
  const [text, setText] = React.useState(0);
  // const lastMessageRef = React.useRef();
  const { sendMessage, selectedConversation } = useConversations();

  const setRef = React.useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText('');
  };

  // React.useEffect(() => {
  //   if (lastMessageRef.current) {
  //     // check if theres a last message, and scroll into the viewport
  //     lastMessageRef.current.scrollIntoView({ smooth: true });
  //   }
  // }, [lastMessageRef.current]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? 'align-self-end' : ''
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe} ? 'bg-primary text-white' : 'border'`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${message.fromMe}? 'text-right' : ''`}
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit">send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;

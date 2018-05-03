import React from 'react';
import { Message, Button } from 'semantic-ui-react';

let FetchError = ({ messages, onRetry }) => (
  <Message error attached='bottom'>
    <Message.Header>Could not process request:</Message.Header>
    <Message.List>
      {messages.split(';').map((message, index) => <Message.Item key={index}>{message}</Message.Item>)}
    </Message.List>
    <Button onClick={onRetry}>Retry</Button>
  </Message>
);

export default FetchError;

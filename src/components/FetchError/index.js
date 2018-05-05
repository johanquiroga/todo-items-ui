import React from 'react';
import { Message, Button } from 'semantic-ui-react';

let FetchError = ({ message, onRetry }) => (
  <Message error attached='bottom'>
    <Message.Header>Could not process request:</Message.Header>
    <p>{message}</p>
    <Button onClick={onRetry}>Retry</Button>
  </Message>
);

export default FetchError;

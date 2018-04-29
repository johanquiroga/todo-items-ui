import React from 'react';
import { List } from 'semantic-ui-react';
import { withState, compose } from 'recompose';

const Todo = ({
  onTodoClick,
  onDeleteClick,
  completed,
  name,
  isFocused,
  setFocus
}) => (
    <List.Item
      onDoubleClick={() => console.log('double click')}
      active={!completed}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {
        isFocused &&
        <List.Content floated='right'>
          <List.Icon
            verticalAlign='middle'
            onClick={onDeleteClick}
            size='large'
            name='close'
            link
            color='red'
          />
        </List.Content>
      }
      <List.Icon
        verticalAlign='middle'
        onClick={onTodoClick}
        size='large'
        name={completed ? 'checkmark box' : 'square outline'}
        link
      />
      <List.Content
        verticalAlign='middle'
        style={{
          textDecoration:
          completed ?
          'line-through' :
          'none'
        }}
      >
        {name}
      </List.Content>
    </List.Item>
);

export default compose(
  withState('isFocused', 'setFocus', false),
)(Todo);

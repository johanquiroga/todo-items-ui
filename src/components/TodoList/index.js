import React from 'react';
import Todo from '../Todo';
import { List } from 'semantic-ui-react';

const TodoList = ({
  todos,
  onTodoClick,
  onDeleteClick
}) => (
  <List link divided relaxed size='big'>
    {todos.map(todo =>
      <Todo
        key={todo._id}
        {...todo}
        onTodoClick={() => onTodoClick(todo._id, todo.completed)}
        onDeleteClick={() => onDeleteClick(todo._id)}
      />
    )}
  </List>
);

export default TodoList;

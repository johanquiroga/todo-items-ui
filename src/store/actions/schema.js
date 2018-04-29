import { schema } from 'normalizr';

const todo = new schema.Entity('todos', {}, {idAttribute: '_id'});
const arrayOfTodos = new schema.Array(todo);
const user = new schema.Entity('users', {tasks: arrayOfTodos}, {idAttribute: '_id'});

export { todo, arrayOfTodos, user };

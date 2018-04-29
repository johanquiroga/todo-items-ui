import { schema } from 'normalizr';

export const user = new schema.Entity('users', {}, {idAttribute: '_id'});
export const todo = new schema.Entity('todos', {user}, {idAttribute: '_id'});
export const arrayOfTodos = new schema.Array(todo);

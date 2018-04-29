import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching, getIsActionLoading } from '../reducers';
import * as api from '../../api';

const handleAction = (dispatch, getState) => (action, data) => {
	if (getIsActionLoading(getState(), action)) {
		return Promise.resolve();
	}

	dispatch({
		type: `${action.toUpperCase()}_TODO_REQUEST`,
		actionName: action,
	});

	return api[`${action}Todo`](data).then(
		response => {
			if (response.success) {
				dispatch({
					type: `${action.toUpperCase()}_TODO_SUCCESS`,
					response: normalize(response.task, schema.todo),
					actionName: action,
				});
			} else {
				dispatch({
					type: `${action.toUpperCase()}_TODO_FAILURE`,
					actionName: action,
					message: response.err
						? response.err.message || 'Something went wrong.'
						: 'Something went wrong.'
				});
			}
		},
		error => {
			dispatch({
				type: `${action.toUpperCase()}_TODO_FAILURE`,
				actionName: action,
				message: error.message || 'Something went wrong.'
			});
		}
	);
};

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
    	if (response.success) {
		    dispatch({
			    type: 'FETCH_TODOS_SUCCESS',
			    filter,
			    response: normalize(response.tasks, schema.arrayOfTodos)
		    });
	    } else {
		    dispatch({
			    type: 'FETCH_TODOS_FAILURE',
			    filter,
			    message: response.err
				    ? response.err.message || 'Something went wrong.'
				    : 'Something went wrong.'
		    });
	    }
    },
	  error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const addTodo = (todo) => (dispatch, getState) => handleAction(dispatch, getState)('add', todo);

export const toggleTodo = (id, status) => (dispatch, getState) => handleAction(dispatch, getState)('toggle', {id, status});

export const deleteTodo = (id) => (dispatch, getState) => handleAction(dispatch, getState)('delete', id);

export const editTodo = (id, data) => (dispatch, getState) => handleAction(dispatch, getState)('edit', {id, data});
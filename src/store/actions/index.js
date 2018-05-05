import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching, getIsActionLoading, getIsAuthActionLoading } from '../reducers';
import * as api from '../../api';
import { saveAuthState, removeAuthState } from '../../localStorage';

const handleAction = (dispatch, getState) => (action, data) => {
	if (getIsActionLoading(getState(), action)) {
		return Promise.resolve();
	}

	const { id = null } = data;

	dispatch({
		type: `${action.toUpperCase()}_TODO_REQUEST`,
		actionName: action,
		id,
	});

	return api[`${action}Todo`](data).then(
		response => {
			if (response.success) {
				dispatch({
					type: `${action.toUpperCase()}_TODO_SUCCESS`,
					response: normalize(response.task, schema.todo),
					actionName: action,
					id,
				});
			} else {
				const retryArgs = Object.values(data);
				dispatch({
					type: `${action.toUpperCase()}_TODO_FAILURE`,
					actionName: action,
					message: response.err
						? response.err.message || 'Something went wrong trying to ' + action + ' todo.'
						: 'Something went wrong trying to ' + action + ' todo.',
					id,
					onRetry: () => dispatch(actions[`${action}Todo`](...retryArgs)),
				});
			}
			return response.success;
		},
		error => {
			const retryArgs = Object.values(data);
			dispatch({
				type: `${action.toUpperCase()}_TODO_FAILURE`,
				actionName: action,
				message: error.message || 'Something went wrong trying to ' + action + ' todo.',
				id,
				onRetry: () => dispatch(actions[`${action}Todo`](...retryArgs)),
			});
			return false;
		}
	);
};

const handleToken = ({success, user}, token, action, getState) => {
	if (success) {
		if (action === 'logout') {
			api.removeApiAuthHeader();
			removeAuthState();
		}
		if (token && (action === 'login' || action === 'getUser')) {
			saveAuthState({
				auth: {isAuth: success, authToken: token, userInfo: user}
		  });
			api.setApiAuthHeader(token);
		}
	}
};

const handleAuthAction = (dispatch, getState) => (action, data = {}) => {
	if (getIsAuthActionLoading(getState(), action)) {
		return Promise.resolve();
	}

	dispatch({
		type: `${action.toUpperCase()}_REQUEST`,
		actionName: action,
	});

	return api[`${action}`](data).then(
		response => {
			if (response.success) {
				const token = response.token || data.authToken || null;
				handleToken(response, token, action, getState);
				dispatch({
					type: `${action.toUpperCase()}_SUCCESS`,
					response: normalize(response.user, schema.user),
					token,
					actionName: action,
				});
			} else {
				dispatch({
					type: `${action.toUpperCase()}_FAILURE`,
					actionName: action,
					message: response.err
						? response.err.message || 'Something went wrong.'
						: 'Something went wrong.'
				});
			}
			return response.success;
		},
		error => {
			dispatch({
				type: `${action.toUpperCase()}_FAILURE`,
				actionName: action,
				message: error.message || 'Something went wrong.'
			});
			return false;
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
				    : 'Something went wrong.',
						onRetry: () => dispatch(fetchTodos(filter)),
		    });
	    }
    },
	  error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
				onRetry: () => dispatch(fetchTodos(filter)),
      });
    }
  );
};

export const addTodo = (todo) => (dispatch, getState) => handleAction(dispatch, getState)('add', {todo});

export const toggleTodo = (id, status) => (dispatch, getState) => handleAction(dispatch, getState)('toggle', {id, status});

export const deleteTodo = (id) => (dispatch, getState) => handleAction(dispatch, getState)('delete', {id});

export const editTodo = (id, data) => (dispatch, getState) => handleAction(dispatch, getState)('edit', {id, data});

export const login = (data) => (dispatch, getState) => handleAuthAction(dispatch, getState)('login', data);

export const logout = () => (dispatch, getState) => handleAuthAction(dispatch, getState)('logout');

export const register = (data) => (dispatch, getState) => handleAuthAction(dispatch, getState)('register', data);

export const getUser = (data) => (dispatch, getState) => handleAuthAction(dispatch, getState)('getUser', data);

const actions = {
	fetchTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
	editTodo,
	login,
	logout,
	register,
	getUser,
};

import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
import createActionState, * as fromAction from './actionState';
import createAuthState, * as fromAuth from './auth';
import createAuthActionState, * as fromAuthAction from './authActions';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const actionState = combineReducers({
  add: createActionState('add'),
  delete: createActionState('delete'),
  toggle: createActionState('toggle'),
	edit: createActionState('edit'),
	register: createAuthActionState('register'),
	logout: createAuthActionState('logout'),
	login: createAuthActionState('login'),
  getUser: createAuthActionState('getUser'),
});

const todos = combineReducers({
  byId,
  listByFilter,
  actionState,
  auth: createAuthState()
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getIsActionLoading = (state, action, id = null) =>
  fromAction.getIsActionLoading(state.actionState[action], id);

export const getErrorMessage = (state, filter) =>
	fromList.getErrorMessage(state.listByFilter[filter]) || getActionErrorMessage(state, ['add', 'delete', 'toggle', 'edit']);

export const getActionErrorMessage = (state, actions) => {
  if (typeof actions === 'string') {
    return fromAction.getActionErrorMessage(state.actionState[actions]);
  }

  return actions
    .map(action => fromAction.getActionErrorMessage(state.actionState[action]))
    .find(error => error !== null);
};

export const getOnRetry = (state, filter) =>
  fromList.getOnRetry(state.listByFilter[filter]) || getActionOnRetry(state, ['add', 'delete', 'toggle', 'edit']);

export const getActionOnRetry = (state, actions) => {
  if (typeof actions === 'string') {
    return fromAction.getOnRetry(state.actionState[actions]);
  }

  return actions
    .map(action => fromAction.getOnRetry(state.actionState[action]))
    .find(error => error !== null);
};

export const getIsAuthActionLoading = (state, action) =>
	fromAuthAction.getIsAuthActionLoading(state.actionState[action]);

export const getAuthActionErrorMessage = (state, action) =>
	fromAuthAction.getAuthActionErrorMessage(state.actionState[action]);

export const getIsAuth = (state) =>
  fromAuth.getIsAuth(state.auth);

export const getUserInfo = (state) =>
  fromAuth.getUserInfo(state.auth);

export const getAuthToken = (state) =>
  fromAuth.getAuthToken(state.auth);

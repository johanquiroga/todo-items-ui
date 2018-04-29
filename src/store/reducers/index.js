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

export const getErrorMessage = (state, filter) =>
	fromList.getErrorMessage(state.listByFilter[filter]);

export const getIsActionLoading = (state, action) =>
  fromAction.getIsActionLoading(state.actionState[action]);

export const getActionErrorMessage = (state, action) =>
  fromAction.getActionErrorMessage(state.actionState[action]);

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
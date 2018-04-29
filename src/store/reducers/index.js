import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
import createActionState, * as fromAction from './actionState';

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
});

const todos = combineReducers({
  byId,
  listByFilter,
  actionState,
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

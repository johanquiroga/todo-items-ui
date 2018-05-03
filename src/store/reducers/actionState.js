import { combineReducers } from 'redux';

const createActionState = (actionName) => {
  const isLoading = (state = false, action) => {
    if (action.actionName !== actionName) {
      return state;
    }

    switch (action.type) {
      case `${actionName.toUpperCase()}_TODO_REQUEST`:
        return true;
      case `${actionName.toUpperCase()}_TODO_FAILURE`:
      case `${actionName.toUpperCase()}_TODO_SUCCESS`:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.actionName !== actionName) {
      return state;
    }

    switch (action.type) {
      case `${actionName.toUpperCase()}_TODO_FAILURE`:
        return action.message
      case `${actionName.toUpperCase()}_TODO_REQUEST`:
      case `${actionName.toUpperCase()}_TODO_SUCCESS`:
        return null;
      default:
        return state;
    }
  };

  const todoId = (state = null, action) => {
    if (action.actionName !== actionName && !action.id) {
      return state;
    }

    switch (action.type) {
      case `${actionName.toUpperCase()}_TODO_REQUEST`:
        return action.id;
      case `${actionName.toUpperCase()}_TODO_SUCCESS`:
      case `${actionName.toUpperCase()}_TODO_FAILURE`:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    isLoading,
    errorMessage,
    todoId,
  });
};

export default createActionState;

export const getIsActionLoading = (state, id) => state.isLoading && state.todoId === id;

export const getActionErrorMessage = (state) => state.errorMessage;

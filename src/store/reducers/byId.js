const byId = (state = {}, action) => {
  if (action.type === 'DELETE_TODO_SUCCESS') {
    const {[action.response.result]: deleted,...nextState} = state;
    return nextState;
  }

  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }

  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];

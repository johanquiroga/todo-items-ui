import { combineReducers } from 'redux';

const createAuthActionState = (actionName) => {
	const isLoading = (state = false, action) => {
		if (actionName !== action.actionName) {
			return state;
		}
		switch (action.type) {
			case `${actionName.toUpperCase()}_REQUEST`:
				return true;
			case `${actionName.toUpperCase()}_SUCCESS`:
			case `${actionName.toUpperCase()}_FAILURE`:
				return false;
			default:
				return state;
		}
	};

	const errorMessage = (state = null, action) => {
		if (actionName !== action.actionName) {
			return state;
		}
		switch (action.type) {
			case `${actionName.toUpperCase()}_FAILURE`:
				return action.message;
			case `${actionName.toUpperCase()}_REQUEST`:
			case `${actionName.toUpperCase()}_SUCCESS`:
				return null;
			default:
				return state;
		}
	};

	return combineReducers({
		isLoading,
		errorMessage
	});
};

export default createAuthActionState;

export const getIsAuthActionLoading = (state) => state.isLoading;
export const getAuthActionErrorMessage = (state) => state.errorMessage;
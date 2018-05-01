import { combineReducers } from 'redux';

const createAuthState = () => {
	const isAuth = (state = false, action) => {
		switch (action.type) {
			case 'LOGOUT_SUCCESS':
				return false;
			case 'LOGIN_SUCCESS':
			case 'GETUSER_SUCCESS':
				return true;
			default:
				return state;
		}
	};

	const userInfo = (state = {}, action) => {
		switch (action.type) {
			case 'REGISTER_SUCCESS':
			case 'LOGIN_SUCCESS':
			case 'GETUSER_SUCCESS':
				return action.response.entities.users[action.response.result];
			case 'REGISTER_FAILURE':
			case 'LOGIN_FAILURE':
			case 'LOGOUT_SUCCESS':
				return null;
			default:
				return state;
		}
	};

	const authToken = (state = null, action) => {
		switch (action.type) {
			case 'LOGIN_SUCCESS':
			case 'GETUSER_SUCCESS':
				return action.token;
			case 'LOGIN_FAILURE':
			case 'LOGOUT_SUCCESS':
				return null;
			default:
				return state;
		}
	};

	return combineReducers({
		isAuth,
		userInfo,
		authToken,
	});
};

export default createAuthState;

export const getIsAuth = (state) => state.isAuth;
export const getUserInfo = (state) => state.userInfo;
export const getAuthToken = (state) => state.authToken;

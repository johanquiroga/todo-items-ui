import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import todoApp from './reducers';
import { loadAuthState, saveAuthState } from '../localStorage';
import { normalize } from 'normalizr';
import * as schema from './actions/schema';
import { handleToken } from './actions';

const configureStore = () => {
  const middlewares = [thunk];
  const persistedState = loadAuthState();

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    todoApp,
	  persistedState,
    applyMiddleware(...middlewares)
  );

	if (persistedState && persistedState.auth.isAuth) {
		handleToken(persistedState.auth.authToken, 'login');
		store.dispatch({
			type: 'LOGIN_SUCCESS',
			response: normalize(persistedState.auth.userInfo, schema.user),
			token: persistedState.auth.authToken,
			actionName: 'login',
		});
	}

  store.subscribe(() => {
  	saveAuthState({
		  auth: store.getState().auth
	  });
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

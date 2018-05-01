import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import todoApp from './reducers';
import { loadAuthState } from '../localStorage';
import { getUser } from './actions';

const configureStore = () => {
  const middlewares = [thunk];
  const persistedState = loadAuthState();

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );

  if (persistedState && persistedState.auth.isAuth) {
    store.dispatch(getUser(persistedState.auth));
  }

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

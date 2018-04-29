import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import Root from './components/Root';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();

import React from 'react';
import PropTypes from 'prop-types';
import App from '../TodoApp';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;

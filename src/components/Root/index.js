import React from 'react';
import PropTypes from 'prop-types';
import App from '../TodoApp';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
	    <Switch>
		    <Route path='/login' component={Login} />
		    <Route path='/register' component={Register} />
		    <Route path='/:filter?' component={App} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

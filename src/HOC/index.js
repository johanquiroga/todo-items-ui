import React from 'react';
import Loading from '../components/Loading';
import FetchError from '../components/FetchError';
import { Redirect } from 'react-router-dom';

export const withLoading = (conditionFn) => (Component) => (props) => (
  <div>
    <Component {...props} />

    {conditionFn(props) && <Loading />}
  </div>
);

export const withError = (conditionFn) => (Component) => (props) => (
  <div>
    <Component {...props} />

    {
      conditionFn(props) &&
      <FetchError
        message={props.errorMessage}
        onRetry={props.onRetry}
      />
    }
  </div>
);

export const withAuth = (conditionFn) => (Component) => (props) => (
  conditionFn(props)
    ? <Component {...props}/>
    : <Redirect to='/login' />
);

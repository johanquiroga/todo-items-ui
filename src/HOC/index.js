import React from 'react';
import Loading from '../components/Loading';
import FetchError from '../components/FetchError';

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
        onRetry={() => props.fetchTodos(props.filter)}
      />
    }
  </div>
);

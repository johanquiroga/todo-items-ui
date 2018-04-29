import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { loadingCondition, errorCondition } from '../../constants';
import TodoList from '../TodoList';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../../store/reducers';
import * as actions from '../../store/actions';
import * as enhance from '../../HOC';
import { Segment, Message } from 'semantic-ui-react';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, deleteTodo, todos, isFetching, errorMessage } = this.props;

    if (todos.length === 0 && !isFetching && !errorMessage) {
      return (
        <Message warning attached='bottom'>
          <Message.Header>Oops!</Message.Header>
          <p>There's nothing to show here.</p>
        </Message>
      );
    }

    return (
      <Segment raised attached='bottom'>
        <TodoList
          todos={todos}
          onTodoClick={toggleTodo}
          onDeleteClick={deleteTodo}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state, { match: { params }}) => {
  const filter =  params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

VisibleTodoList = compose(
  withRouter,
  connect(
    mapStateToProps,
    actions
  ),
  enhance.withError(errorCondition),
  enhance.withLoading(loadingCondition),
)(VisibleTodoList);

export default VisibleTodoList;

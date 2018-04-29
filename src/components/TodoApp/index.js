import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Grid, Container, Header } from 'semantic-ui-react';
import AddTodo from '../AddTodo';
import VisibleTodoList from '../VisibleTodoList';
import Footer from '../Footer';
import { withAuth } from '../../HOC';
import { authCondition } from '../../constants';
import { getIsAuth } from '../../store/reducers';

const TodoApp = () => (
  <Container text>
    <Grid
      textAlign='center'
      verticalAlign='middle'
      style={{ height: '100%' }}
      padded
    >
      <Grid.Column>
        <Header as='h1' color='teal'>
          Todos
        </Header>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </Grid.Column>
    </Grid>
  </Container>
);

const mapStateToProps = (state) => {
	return {
		isAuth: getIsAuth(state),
	};
};

export default compose(
	connect(mapStateToProps),
	withAuth(authCondition)
)(TodoApp);

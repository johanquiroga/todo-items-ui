import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Grid, Container, Header, Menu, Dropdown } from 'semantic-ui-react';
import AddTodo from '../AddTodo';
import VisibleTodoList from '../VisibleTodoList';
import Footer from '../Footer';
import { withAuth } from '../../HOC';
import { authCondition } from '../../constants';
import { logout } from '../../store/actions';
import { getIsAuth, getUserInfo } from '../../store/reducers';
import logo from '../../logo.svg';

const TodoApp = ({user, logout}) => (
  <Container text>
    <Grid
      textAlign='center'
      verticalAlign='middle'
      style={{ height: '100%' }}
      padded
    >
      <Grid.Column>
	      <Menu secondary widths={3}>
		      <Menu.Item>
			      <img src={logo} alt='Todo items logo' />
		      </Menu.Item>
		      <Menu.Item>
			      <Header as='h1' color='teal'>
				      Todos
			      </Header>
		      </Menu.Item>
		      <Dropdown item text={user.firstName + ' ' + user.lastName}>
			      <Dropdown.Menu>
				      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
			      </Dropdown.Menu>
		      </Dropdown>
	      </Menu>
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
		user: getUserInfo(state),
	};
};

export default compose(
	connect(mapStateToProps, {logout}),
	withAuth(authCondition)
)(TodoApp);

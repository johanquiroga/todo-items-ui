import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Form, Segment, Message, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { withState, compose, branch, renderComponent } from 'recompose';
import { getAuthActionErrorMessage, getIsAuth, getIsAuthActionLoading } from '../../../store/reducers';
import { login } from '../../../store/actions';
import TodoApp from '../../TodoApp';
import { authCondition } from '../../../constants';

const Login = ({login, isLoading, errorMessage, email, setEmail, password, setPassword, history}) => (
	<Container text>
		<Grid
			textAlign='center'
			verticalAlign='middle'
			style={{ height: '100%' }}
			padded
		>
			<Grid.Column>
				<Header as='h1' color='teal'>
					Log-in
				</Header>
				<Form loading={isLoading} error={!!errorMessage} size='large' onSubmit={() => {
					if (email !== '' && password !== '') {
						login({email, password}).then((response) => {
							if (response) {
								setEmail('');
								setPassword('');
								history.replace('/');
							}
						});
					}
				}}>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='E-mail address'
							name='email'
							value={email}
							onChange={(e, {value}) => setEmail(value)}
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							name='password'
							value={password}
							onChange={(e, {value}) => setPassword(value)}
						/>
						{errorMessage &&
							<Message error>
								<Message.Header>Could not process request:</Message.Header>
								<p>{errorMessage}</p>
							</Message>
						}
						<Button color='teal' fluid size='large'>Login</Button>
					</Segment>
				</Form>
				<Message>
					Already have an account? <Link to='/register'>Sign Up</Link>
				</Message>
			</Grid.Column>
		</Grid>
	</Container>
);

const mapStateToProps = (state) => {
	return {
		isAuth: getIsAuth(state),
		errorMessage: getAuthActionErrorMessage(state, 'login'),
		isLoading: getIsAuthActionLoading(state, 'login'),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {login}),
	withState('email', 'setEmail', ''),
	withState('password', 'setPassword', ''),
	branch(
		authCondition,
		renderComponent(TodoApp)
	)
)(Login);
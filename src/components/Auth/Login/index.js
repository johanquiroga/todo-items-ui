import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Form, Segment, Message, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { authCondition } from '../../../constants';
import { getAuthActionErrorMessage, getIsAuth, getIsAuthActionLoading } from '../../../store/reducers';
import { login } from '../../../store/actions';

const initialState = {
	email: '',
	password: ''
};

class Login extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = initialState;
	}

	resetState = () => this._isMounted && this.setState(initialState);

	componentDidMount() {
		this._isMounted = true;

		if (authCondition(this.props)) {
			this.toHome();
		}
	}

	componentWillUnmount() {
    this._isMounted = false;
  }

	componentWillReceiveProps(props) {
		if (authCondition(props)) {
			this.toHome();
		}
	}

	toHome = () => this.props.history.replace('/');

	handleChange = (e, {name, value}) => this._isMounted && this.setState({ [name]: value });

	handleSubmit = () => {
		const { email, password } = this.state;
		const { login } = this.props;

		if (email !== '' && password !== '') {
			login({email, password}).then((response) => {
				if (response) {
					this.resetState();
				}
			});
		}
	};

	render() {
		const { isLoading, errorMessage } = this.props;
		const { email, password } = this.state;

		return (
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
						<Form loading={isLoading} error={!!errorMessage} size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									icon='user'
									iconPosition='left'
									placeholder='E-mail address'
									name='email'
									value={email}
									onChange={this.handleChange}
								/>
								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Password'
									type='password'
									name='password'
									value={password}
									onChange={this.handleChange}
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
							Don't have an account? <Link to='/register'>Sign Up</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: getIsAuth(state),
		errorMessage: getAuthActionErrorMessage(state, 'login') || getAuthActionErrorMessage(state, 'getUser'),
		isLoading: getIsAuthActionLoading(state, 'login') || getIsAuthActionLoading(state, 'getUser'),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {login}),
)(Login);

import React, { Component } from 'react';
import { Container, Grid, Header, Form, Segment, Message, Button, List } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';
import { messages, validators } from '../../../constants';
import { compose } from 'recompose';
import { getAuthActionErrorMessage, getIsAuth, getIsAuthActionLoading } from '../../../store/reducers';

const initialErrors = {
	email: null,
	password: null,
	firstName: null,
	lastName: null,
};

const initialState = {
	email: '',
	password: '',
	passwordConfirmation: '',
	firstName: '',
	lastName: '',
	errors: initialErrors,
	valid: true,
	registered: null,
};

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	resetState = () => this.setState(initialState);

	componentDidMount() {
		if (this.props.isAuth) {
			this.toHome();
		}
	}

	toHome = () => this.props.history.replace('/');

	handleChange = (e, {name, value}) => this.setState({ [name]: value });

	handleSubmit = () => {
		const { email, password, firstName, lastName, valid } = this.state;
		const { register } = this.props;
		if (valid) {
			register({email, password, firstName, lastName})
				.then((response) => {
					console.log(response);
					if (response) {
						this.resetState();
						this.setState({registered: true});
					}
				});
		}
	};

	checkErrors = (cb) => {
		this.setState(
			prevState => ({ valid: !Object.values(prevState.errors).some(error => error !== null) }),
			cb
		);
	};

	validateInput = () => {
		for (const input in this.state) {
			if (validators.hasOwnProperty(input) && messages.hasOwnProperty(input)) {
				let error = null;
				if (input === 'password') {
					if (!validators[input](this.state[input], this.state[input+'Confirmation'])) {
						error = messages[input];
					}
				} else {
					if (!validators[input](this.state[input])) {
						error = messages[input];
					}
				}
				this.setState((prevState) => ({
					errors: {
						...prevState.errors,
						[input]: error
					}
				}));
			}
		}
	};

	render() {
		const { isLoading, errorMessage } = this.props;
		const {
			email,
			password,
			passwordConfirmation,
			firstName,
			lastName,
			errors,
			valid,
			registered,
		} = this.state;

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
							Register
						</Header>
						<Form loading={isLoading} error={!!errorMessage || !valid} success={registered} size='large' onSubmit={() => {
							this.validateInput();
							this.checkErrors(this.handleSubmit);
						}}>
							<Segment stacked textAlign='left'>
								<Form.Group widths={3}>
									<Form.Input
										required
										label='First name'
										fluid
										placeholder='First name'
										name='firstName'
										value={firstName}
										onChange={this.handleChange}
									/>
									<Form.Input
										required
										label='Last name'
										fluid
										placeholder='Last name'
										name='lastName'
										value={lastName}
										onChange={this.handleChange}
									/>
									<Form.Input
										required
										label='E-mail address'
										fluid
										placeholder='E-mail address'
										name='email'
										value={email}
										onChange={this.handleChange}
									/>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Input
										required
										label='Password'
										fluid
										placeholder='Password'
										type='password'
										name='password'
										value={password}
										onChange={this.handleChange}
									/>
									<Form.Input
										required
										label='Confirm your password'
										fluid
										placeholder='Confirm your password'
										type='password'
										name='passwordConfirmation'
										value={passwordConfirmation}
										onChange={this.handleChange}
									/>
								</Form.Group>
								{
									errorMessage &&
									<Message error>
										<Message.Header>Could not process request:</Message.Header>
										<p>{errorMessage}</p>
									</Message>
								}
								{
									!valid &&
									<Message error>
										<Message.Header>You got some errors:</Message.Header>
										<List bulleted>
											{Object.values(errors).map((error, index) => error && <List.Item key={index}>{error}</List.Item>)}
										</List>
									</Message>
								}
								{
									registered &&
									<Message success>
										<Message.Header>Congratulations!</Message.Header>
										<p>Your request has been successful.</p>
										<NavLink
											className='teal ui button'
											to='/login'
										>
											Log-in Here
										</NavLink>
									</Message>
								}
								<Button color='teal' fluid size='large'>Register</Button>
							</Segment>
						</Form>
						<Message>
							Already have an account? <Link to='/login'>Log-In</Link>
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
		errorMessage: getAuthActionErrorMessage(state, 'register'),
		isLoading: getIsAuthActionLoading(state, 'register'),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {register}),
)(Register);
import validator from 'validator';

export const loadingCondition = (props) =>
  props.isLoading;

export const errorCondition = (props) =>
  props.errorMessage;

export const authCondition = (props) =>
	props.isAuth;

export const priorities = {
	0: {text: 'Low', color: 'green', value: 0, key: '0'},
	1: {text: 'Normal', color: 'orange', value: 1, key: '1'},
	2: {text: 'High', color: 'red', value: 2, key: '2'},
};

export const messages = {
	email: 'Please enter a valid E-mail',
	password: 'Passwords don\'t match',
	firstName: 'First name must not contain numbers or spaces',
	lastName: 'Last name must not contain numbers or spaces',
};

export const validators = {
	email: validator.isEmail,
	password: validator.equals,
	firstName: validator.isAlpha,
	lastName: validator.isAlpha,
};
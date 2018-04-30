import validator from 'validator';

export const loadingCondition = (props) =>
  props.isLoading;

export const errorCondition = (props) =>
  props.errorMessage;

export const authCondition = (props) =>
	props.isAuth;

export const priorities = {
	0: {text: 'Low', color: 'green'},
	1: {text: 'Normal', color: 'orange'},
	2: {text: 'High', color: 'red'},
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
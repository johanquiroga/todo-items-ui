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
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL,
	timeout: 10000,
	headers: {
	  'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
});

export const setApiAuthHeader = (token) => {
	api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeApiAuthHeader = () => {
	delete api.defaults.headers.common['Authorization'];
};

const handleError = (err) => {
	if (err.response) {
		return err.response.data;
	} else {
		return {success: false, message: err.message};
	}
};

export const fetchTodos = (filter) =>
  api.get('/tasks')
    .then(response => {
    	if (response.data.success) {
		    switch (filter) {
			    case 'all':
				    return response.data;
			    case 'active':
				    return {success: response.data.success, tasks: response.data.tasks.filter(t => !t.completed)};
			    case 'completed':
				    return {success: response.data.success, tasks: response.data.tasks.filter(t => t.completed)};
			    default:
				    throw new Error(`Unknown filter: ${filter}`);
		    }
	    } else {
    		return response.data;
	    }
    }, err => handleError(err));

export const addTodo = ({todo}) =>
  api.post('/tasks', {...todo})
    .then(
    	response => response.data,
		  err => handleError(err)
    );

export const toggleTodo = ({id, status}) =>
  api.put(`/tasks/${id}`, {completed: !status})
    .then(
    	response => response.data,
	    err => handleError(err)
	  );

export const deleteTodo = ({id}) =>
  api.delete(`/tasks/${id}`)
	  .then(
	    response => response.data,
	    err => handleError(err)
	  );

export const editTodo = ({id, data}) =>
	api.put(`/tasks/${id}`, {data})
		.then(
			response => response.data,
			err => handleError(err)
		);

export const login = (credentials) =>
	api.post('/users/login', credentials)
		.then(
			response => response.data,
			err => handleError(err)
		);

export const logout = () =>
	api.post('/users/logout')
		.then(
			response => response.data,
			err => handleError(err)
		);

export const register = (data) =>
	api.post('/users/signup', data)
		.then(
			response => response.data,
			err => handleError(err)
		);

export const getUser = (data) =>
	api.get(`/users/${data.userInfo._id}`, {headers: {Authorization: `Bearer ${data.authToken}`}})
		.then(
			response => response.data,
			err => handleError(err),
		);

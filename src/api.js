import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
	headers: {
	  'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWU0YzgxY2RhNzVhNTMzYzYzZDdlZWMiLCJpYXQiOjE1MjQ5NDM0MDUsImV4cCI6MTUyNDk3OTQwNX0.ZubWDT_sbjn1OTi3QtbjyDtZTPS5cVr2vMTujxDC2U4'
	}
});

const handleError = (err) => {
	if (err.response) {
		return err.response.data;
	} else {
		return {success: false};
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

export const addTodo = (todo) =>
  api.post('/tasks', {data: todo})
    .then(
    	response => response.data,
		  err => handleError(err)
    );

export const toggleTodo = ({id, status}) =>
  api.put(`/tasks/${id}`, {data: {completed: !status}})
    .then(
    	response => response.data,
	    err => handleError(err)
	  );

export const deleteTodo = (id) =>
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

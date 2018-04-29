import React from 'react';
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import { Form, Segment, Button } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { addTodo } from '../../store/actions';

const options = [
	{key: '0', text: 'Low', value: 0},
	{key: '1', text: 'Normal', value: 1},
	{key: '2', text: 'High', value: 2}
];

let AddTodo = ({dispatch, input, setInput, focused, setFocused, date, setDate, priority, setPriority}) => (
  <Segment basic attached='top'>
	  <Form onSubmit={() => {
	  	if (input.trim() !== '' && date !== null && priority !== -1) {
			  dispatch(addTodo({name: input.trim(), dueDate: date.toISOString(), priority}));
			  setInput('');
			  setDate(null);
			  setFocused(null);
			  setPriority(-1);
		  }
    }}>
      <Form.Group inline widths='equal'>
        <Form.Input
          name='input'
          value={input}
          placeholder='What do you need?'
          fluid
          transparent
          size='big'
          onChange={(e, {name, value}) => setInput(value)}
        />
        <Form.Field>
          <SingleDatePicker
            date={date}
            onDateChange={newDate => setDate(newDate)}
            focused={focused}
            onFocusChange={({focused}) => setFocused(focused)}
            small
            showDefaultInputIcon
            inputIconPosition='after'
            noBorder
            numberOfMonths={1}
          />
        </Form.Field>
	      <Form.Select name='priority' fluid onChange={(e, {value}) => setPriority(value)} compact options={options} placeholder='Priority' />
        <Button icon='plus' positive floated='right'/>
      </Form.Group>
		</Form>
  </Segment>
);
AddTodo = compose(
  connect(),
  withState('input', 'setInput', ''),
	withState('date', 'setDate', null),
	withState('priority', 'setPriority', -1),
	withState('focused', 'setFocused', null),
)(AddTodo);

export default AddTodo;

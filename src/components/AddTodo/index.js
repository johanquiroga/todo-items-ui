import React from 'react';
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import { Form, Segment, Button } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { getIsActionLoading } from '../../store/reducers';
import { addTodo } from '../../store/actions';
import { priorities } from '../../constants';

const options = Object.values(priorities);

let AddTodo = ({addTodo, isLoading, input, setInput, focused, setFocused, date, setDate, priority, setPriority}) => (
  <Segment basic attached='top'>
	  <Form loading={isLoading} onSubmit={() => {
	  	if (input.trim() !== '' && date !== null && priority !== -1) {
			  addTodo({name: input.trim(), dueDate: date.toISOString(), priority})
        .then((response) => {
          if (response) {
            setInput('');
            setDate(null);
            setFocused(null);
            setPriority(-1);
          }
        });
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
            showClearDate
          />
        </Form.Field>
	      <Form.Select name='priority' fluid onChange={(e, {value}) => setPriority(value)} compact options={options} placeholder='Priority' />
        <Button icon='plus' positive floated='right'/>
      </Form.Group>
		</Form>
  </Segment>
);

const mapStateToProps = (state) => {
  return {
    isLoading: getIsActionLoading(state, 'add'),
  };
};

AddTodo = compose(
  connect(mapStateToProps, {addTodo}),
  withState('input', 'setInput', ''),
	withState('date', 'setDate', null),
	withState('priority', 'setPriority', -1),
	withState('focused', 'setFocused', null),
)(AddTodo);

export default AddTodo;

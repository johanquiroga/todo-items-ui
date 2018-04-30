import React from 'react';
import { List, Label } from 'semantic-ui-react';
import { withState, compose } from 'recompose';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { priorities } from '../../constants';

const Todo = ({
  onTodoClick,
  onDeleteClick,
  completed,
  name,
	dueDate,
  isFocused,
  setFocus,
	priority,
	focused
}) => (
    <List.Item
      onDoubleClick={() => console.log('double click')}
      active={!completed}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {
        isFocused &&
        <List.Content floated='right'>
          <List.Icon
            verticalAlign='middle'
            onClick={onDeleteClick}
            size='large'
            name='close'
            link
            color='red'
          />
        </List.Content>
      }
      <List.Icon
        verticalAlign='middle'
        onClick={onTodoClick}
        size='large'
        name={completed ? 'checkmark box' : 'square outline'}
        link
      />
      <List.Content
        verticalAlign='middle'
        style={{
          textDecoration:
          completed ?
          'line-through' :
          'none'
        }}
      >
	      {name} - <small>Due date:
		      <SingleDatePicker
			      date={moment(dueDate)}
			      onDateChange={newDate => console.log(newDate)}
			      focused={focused}
			      onFocusChange={() => console.log()}
			      small
			      noBorder
			      numberOfMonths={1}
			      readOnly
		      />
        </small>
	      <Label as='span' color={!completed ? priorities[priority].color : 'grey'} tag>{priorities[priority].text}</Label>
      </List.Content>
    </List.Item>
);

export default compose(
  withState('isFocused', 'setFocus', false),
	withState('focused', 'setFocused', false),
)(Todo);

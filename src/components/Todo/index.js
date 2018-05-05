import React from 'react';
import { List, Label, Dropdown } from 'semantic-ui-react';
import { withState, compose } from 'recompose';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { priorities } from '../../constants';
import { getIsActionLoading } from '../../store/reducers';

const options = Object.values(priorities);

const Todo = ({
	_id,
  onTodoClick,
  onDeleteClick,
  onTodoEdit,
  completed,
  name,
	dueDate,
  isFocused,
  setFocus,
	priority,
	focused,
  setFocused,
  isEditLoading,
  isToggleLoading,
  isDeleteLoading,
}) => (
    <List.Item
      active={!completed}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {
        (isDeleteLoading || isFocused) &&
        <List.Content floated='right'>
          <List.Icon
            verticalAlign='middle'
            onClick={onDeleteClick}
            size='large'
            name={isDeleteLoading ? 'spinner' : 'close'}
            loading={isDeleteLoading}
            link
            color={!isDeleteLoading ? 'red' : 'teal'}
          />
        </List.Content>
      }
      <List.Icon
        verticalAlign='middle'
        onClick={onTodoClick}
        size='large'
        name={(isToggleLoading || isEditLoading) ? 'spinner' : completed ? 'checkmark box' : 'square outline'}
        link
        loading={isToggleLoading || isEditLoading}
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
			      onDateChange={newDate => onTodoEdit(_id, {dueDate: newDate})}
			      focused={focused}
			      onFocusChange={({focused}) => setFocused(focused)}
			      small
			      showDefaultInputIcon={!completed}
			      inputIconPosition='after'
			      noBorder
			      numberOfMonths={1}
						disabled={completed}
		      />
        </small>
	      <Label as='span' color={!completed ? priorities[priority].color : 'grey'} tag>
		      { !completed ?
						<Dropdown
							text={priorities[priority].text}
							floating
						>
							<Dropdown.Menu>
								{
									options.map(item =>
										<Dropdown.Item key={item.key} value={item.value}
											onClick={(e, {value}) => onTodoEdit(_id, {priority: value})}>
											{item.text}
										</Dropdown.Item>
									)
								}
							</Dropdown.Menu>
						</Dropdown> :
						priorities[priority].text
					}
	      </Label>
      </List.Content>
    </List.Item>
);

const mapStateToProps = (state, {_id}) => ({
	isEditLoading: getIsActionLoading(state, 'edit', _id),
	isToggleLoading: getIsActionLoading(state, 'toggle', _id),
	isDeleteLoading: getIsActionLoading(state, 'delete', _id),
});

export default compose(
	connect(mapStateToProps),
  withState('isFocused', 'setFocus', false),
	withState('focused', 'setFocused', false),
)(Todo);

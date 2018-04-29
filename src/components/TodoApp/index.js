import React from 'react';
import { Grid, Container, Header } from 'semantic-ui-react';
import AddTodo from '../AddTodo';
import VisibleTodoList from '../VisibleTodoList';
import Footer from '../Footer';

const TodoApp = () => (
  <Container text>
    <Grid
      textAlign='center'
      verticalAlign='middle'
      style={{ height: '100%' }}
      padded
    >
      <Grid.Column>
        <Header as='h1' color='teal'>
          Todos
        </Header>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </Grid.Column>
    </Grid>
  </Container>
);

export default TodoApp;

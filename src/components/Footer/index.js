import React from 'react';
import FilterLink from '../FilterLink';
import { Segment, Grid } from 'semantic-ui-react';

const Footer = () => (
  <Segment basic>
    <Grid doubling columns={3} centered>
      <Grid.Row>
        <Grid.Column>
          <FilterLink filter='all'>
            All
          </FilterLink>
        </Grid.Column>
        <Grid.Column>
          <FilterLink filter='active'>
            Active
          </FilterLink>
        </Grid.Column>
        <Grid.Column>
          <FilterLink filter='completed'>
            Completed
          </FilterLink>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default Footer;

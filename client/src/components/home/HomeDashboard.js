import React, { Component } from 'react';
import {
  Card,
  Grid,
  Header,
  Label,
  Segment,
  Statistic
} from 'semantic-ui-react'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const yesterday = new Date();

    const style = {
      panes : {
        width: '92%'
      }
    }
    return (
      <div >
        <Label> QUOTES </Label>
        <br/>
        <br/>
          <Grid>
            <Grid.Row>
              <Grid.Column >
                <Segment >
                  <Label attached='top'>Intake</Label>
                  <Statistic value='20'/>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment >
                <Label attached='top'>Submitted</Label>
                <Statistic value='20'/>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment >
                  <Label attached='top'>Awarded</Label>
                  <Statistic value='20'/>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment >
                  <Label attached='top'>Dead</Label>
                  <Statistic value='20'/>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment >
                  <Label attached='top'>Win Ratio</Label>
                  <Statistic value='23%'/>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>
          <Label> Year to Date GRAINGER</Label>
      </div>
    )
  }
}

export default Dashboard

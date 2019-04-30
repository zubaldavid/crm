import React, { Component } from 'react';
import {
  Card,
  Grid,
  Header,
  Label,
  Progress,
  Segment,
  Statistic
} from 'semantic-ui-react'

const quoters = [ {name:'Aaron', value:10},{name:'Erica', value:5}, {name:'Julie', value:8}, {name:'Kendall', value:10},
{name:'Nadia', value:4}, {name:'Nina', value:5}, {name:'Sergio',value:7}, {name:'Tiffany', value:9}];

const quoteStats = [{label:'Intake', value:12},{label:'Submitted', value:5},{label:'Awarded', value:10},{label:'Dead', value:12},{label:'Win Ratio', value:'88%'}]
const graingerStats = [{label:'Intake', value:8},{label:'Submitted', value:3},{label:'Awarded', value:2},{label:'Dead', value:1},{label:'Win Ratio', value:'25%'}]

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {

  }

  render() {
    return (
      <Segment style={{height: '90%', width: '99%', marginLeft: '.5%'}}>    
      <Grid columns={2} style={style.grid}>
      <Grid.Column>
          <Grid.Column> <Segment compact raised > <Header> QUOTES | $25,721</Header></Segment> </Grid.Column>
          <Segment raised >
            <Statistic.Group >
            { quoteStats.map(stats =>
              <Statistic>
              <Statistic.Value>{stats.value}</Statistic.Value>
              <Statistic.Label>{stats.label}</Statistic.Label>
              </Statistic>
            )}
            </Statistic.Group>
          </Segment>
          <Segment style={style.graph} raised>
            <Header> Quoters Awards Q1 </Header>
            { quoters.map(quoter =>
            <Progress progress='value' value={quoter.value} total={25} size='small' color='blue'> {quoter.name} </Progress>
            )}
          </Segment>
          </Grid.Column>

          <Grid.Column>
          <Segment compact raised> <Header> GRAINGER | $17,026</Header></Segment>
            <Segment raised >
              <Statistic.Group >
              { graingerStats.map(stats =>
                <Statistic>
                <Statistic.Value>{stats.value}</Statistic.Value>
                <Statistic.Label>{stats.label}</Statistic.Label>
                </Statistic>
              )}
              </Statistic.Group>
            </Segment>
            <Segment style={style.graph} raised>
              <Header> Grainger Awards Q1</Header>
              <Progress progress='value' value={6} total={20} size='small' color='blue'> Michael </Progress>
              <Progress progress='value' value={10} total={20} size='small' color='blue'> Jared </Progress>
              <Progress progress='value' value={16} total={20} size='small'color='blue'> Sergio </Progress>
              <Progress progress='value' value={3} total={20} size='small'color='blue'> Steven </Progress>
            </Segment>
            </Grid.Column>
            </Grid>
      </Segment>
    )
  }
}

const style = {
  grid:{marginLeft: '1%', width: '98%'},
}
export default Dashboard

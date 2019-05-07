import React, { Component } from 'react';
import {dateFormat, numberFormat} from './Formats';
import MainModal from './quotes/MainModal';
import PaginateTables from './PaginateTables';
import PaymentsTableModal from './quotes/PaymentsTableModal';
import TopHeader from './TopHeader'
import {
  Card,
  Button,
  Dimmer,
  Grid,
  Header,
  Label,
  Loader,
  Progress,
  Segment,
  Statistic,
  Table
} from 'semantic-ui-react'


const quoters = [ {name:'Aaron', value:10},{name:'Erica', value:5}, {name:'Julie', value:8}, {name:'Kendall', value:10},
{name:'Nadia', value:4}, {name:'Nina', value:5}, {name:'Sergio',value:7}, {name:'Tiffany', value:9}];

const quoteStats = [{label:'Intake', value:12},{label:'Submitted', value:5},{label:'Awarded', value:10},{label:'Dead', value:12},{label:'Win Ratio', value:'88%'}]
const graingerStats = [{label:'Intake', value:8},{label:'Submitted', value:3},{label:'Awarded', value:2},{label:'Dead', value:1},{label:'Win Ratio', value:'25%'}]

const headers = [
  'Q-Number', 'Agency',' Description', 'Employee', 'Due Date', ''
]

function TableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        {headers.map(header =>
          <Table.HeaderCell>{header}</Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
  )
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openContracts: [], openGrainger: [], loading:true, count:  0
    };
  }

  getContractsYesterday = () => {

  }

  getQuotesList () {
    let url = ('/api/dashboard/contracts');
    console.log('Awards List:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({openContracts:data});
      console.log("state", this.state.openContracts);
    });
  }

  componentDidMount () {
      setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    return (
      <div>
      <TopHeader/>
      <Grid columns='equal' style={style.grid}>
      <Grid.Column>
            <Grid columns={2}>
              <Grid.Column>
                <Segment compact raised > <Header> Contracts | $25,721</Header></Segment>
              </Grid.Column>
              <Grid.Column>
                <Button.Group style={{float: 'right'}}>
                  <Button> Yesterday</Button>
                  <Button> Month </Button>
                  <Button> Year</Button>
                </Button.Group>
              </Grid.Column>
            </Grid>

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
          <Segment raised>
          <Table compact size='small'>
            <TableHeader/>
            {this.state.loading &&<Dimmer active>
              <Loader/>
            </Dimmer> }
              {headers.map(q =>
                <Table.Row key={q.id}>
                  <Table.Cell>{q.quote}</Table.Cell>
                  <Table.Cell>{q.agency}</Table.Cell>
                  <Table.Cell>{q.description}</Table.Cell>
                  <Table.Cell>{numberFormat(q.cost)}</Table.Cell>
                  <Table.Cell>{dateFormat(q.due_date)}</Table.Cell>
                  <Table.Cell><MainModal
                    icon={'true'}
                    id={q.id}
                    header={'EDIT QUOTE'}
                    tableAgency={q.agency}
                    tablePOC={q.point_of_contact}
                    tableRev={q.revision}
                    tableEmployee={q.employee}
                    tableStatus={q.status}
                    costExtention={'true'}
                    buyer={q.buyer}
                  />
                  </Table.Cell>
                </Table.Row>
              )}
          </Table>
          </Segment>

      </Grid.Column>

          <Grid.Column>
          <Grid columns={2}>
            <Grid.Column>
              <Segment compact raised > <Header> Grainger | $25,721</Header></Segment>
            </Grid.Column>
            <Grid.Column>
              <Button.Group style={{float: 'right'}}>
                <Button> Yesterday</Button>
                <Button> Month </Button>
                <Button> Year</Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
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
            <Segment raised>
            <Table compact size='small'>
              <TableHeader/>
              {this.state.loading &&<Dimmer active>
                <Loader/>
              </Dimmer> }
                {headers.map(q =>
                  <Table.Row key={q.id}>
                    <Table.Cell>{q.quote}</Table.Cell>
                    <Table.Cell>{q.agency}</Table.Cell>
                    <Table.Cell>{q.description}</Table.Cell>
                    <Table.Cell>{numberFormat(q.cost)}</Table.Cell>
                    <Table.Cell>{dateFormat(q.due_date)}</Table.Cell>
                    <Table.Cell><PaymentsTableModal invoice={q.invoice} cost={q.cost}/></Table.Cell>
                  </Table.Row>
                )}
            </Table>
            </Segment>
            </Grid.Column>
            </Grid>

      </div>
    )
  }
}

const style = {
  grid:{marginLeft: '1%', width: '98%'},
}
export default Dashboard

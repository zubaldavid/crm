import React, { Component } from 'react';
import {
  Button,
  Icon,
  Table
} from 'semantic-ui-react'

const headers = [
  'Quote Number','Agency', 'Point of Contact', 'Solictation', 'Revision','Employee',
  'Received', 'Description', 'Status', 'Due Date','Due Time', 'Date Sent','Date PO',
  'PO Number'
]

class OpenBidsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
       quotes: []
    };
  }

  componentWillMount(){
    console.log('First call to render open bids');
  }

  getQuotesList = () => {
    fetch('/api/openQ_bids')
    .then(res => res.json())
    .then(data => {
      this.setState({quotes:data});
      console.log("state", this.state.quotes)
    })
  }

  compontentDidMount = () => {
    this.getQuotesList();
    console.log('Open Bids Table did mount.');
  }

  render() {
    const {quotes} = this.state;
    const style = {
        edit: { marginLeft: '4%'},
    };
    return (
      <div>
      <Button onClick={this.getQuotesList}>Get</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {headers.map(header =>
                <Table.HeaderCell>{header}</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {quotes.map(q =>
              <Table.Row key={q.id}>
                <Table.Cell>{q.quote}</Table.Cell>
                <Table.Cell>{q.agency}</Table.Cell>
                <Table.Cell>{q.solicitation}</Table.Cell>
                <Table.Cell>{q.revision}</Table.Cell>
                <Table.Cell>{q.point_of_contact}</Table.Cell>
                <Table.Cell>{q.employee}</Table.Cell>
                <Table.Cell>{q.received_date}</Table.Cell>
                <Table.Cell>{q.description}</Table.Cell>
                <Table.Cell>{q.status}</Table.Cell>
                <Table.Cell>{q.due_date}</Table.Cell>
                <Table.Cell>{q.due_time}</Table.Cell>
                <Table.Cell>{q.sent_date}</Table.Cell>
                <Table.Cell>{q.po_receive_date}</Table.Cell>
                <Button style={style.edit}><Icon name='edit'/></Button>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default OpenBidsTable

import React, { Component } from 'react';
import {
  Button,
  Icon,
  Menu,
  Pagination,
  Table
} from 'semantic-ui-react'

const headers = [
  'QuoteNumber','Agency', 'Solictation', 'Revision', 'Point of Contact','Employee',
  'Received', 'Description', 'Status', 'Due Date','Due Time', 'Date Sent','Date PO',
  'PO Number'
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

function PaginationCount(props) {
  return (
    <Pagination style={{float:'right'}}
    //  onSelect={props.changePage}
      boundaryRange={0}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={10}
    />
  )
}

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
    // const perPage  = 15;
    // const pages  = Math.ceil(this.props.quotes.length / perPage );
    // const currentPage = this.props.page;
    // const startOffset = (currentPage - 1) * perPage;
    // let startCount = 0;
    const style = {
        edit: { marginLeft:'4%'},
        table: {width: '92%'},
    };
    return (
      <div>
      <Button onClick={this.getQuotesList}>Get</Button>
        <Table compact size='small'>
        <TableHeader/>
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
        <PaginationCount/>
      </div>
    )
  }
}

export default OpenBidsTable

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import {} from '../FetchCalls'
import {dateFormat} from '../../Formats';
import MainModal from '../MainModal';
import PaginateTables from '../../PaginateTables'
import {
  Button,
  Dimmer,
  Loader,
  Table
} from 'semantic-ui-react'

const headers = [
  'Quote Number', 'Agency', 'Point of Contact', 'Solictation', 'Revision','Employee',
  'Received', 'Description', 'Status', 'Due Date','Due Time', 'Date Sent',
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

class DeadBidsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuotes: [],
      loading: true,
      count: 0
    };
    this.getDeadList = this.getDeadList.bind(this);
  }

  getDeadList (activePage) {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/quote/dead_bids/?page=' + activePage);
    console.log('Quote List:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({allQuotes:data});
      console.log("state", this.state.allQuotes);
    });
  }

  getCount () {
    fetch('/api/quote/dead_bids/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
      console.log("state", this.state.count);
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1000); // simulates loading of data
    this.getCount();
    this.getDeadList();
    console.log('Dead Bids Table did mount.');
  }

  render() {
    const {allQuotes, loading, count} = this.state;
    const pages = Math.ceil(count / 20);
    const style = {
        edit: { marginLeft:'4%'},
        table: {width: '92%'},
        grid : {float: 'left'},
        totalPages: {marginLeft: '25%', width: '100px'}
    };
    return (
      <div>
      <PaginateTables totalPages={pages}  handlePagination={this.getDeadList}/>
    <Table compact size='small'>
      <TableHeader/>
      {this.state.loading &&<Dimmer active>
        <Loader/>
      </Dimmer> }
          {allQuotes.map(q =>
            <Table.Row key={q.id}>
              <Table.Cell>{q.quote}</Table.Cell>
              <Table.Cell>{q.agency}</Table.Cell>
              <Table.Cell>{q.point_of_contact}</Table.Cell>
              <Table.Cell>{q.solicitation}</Table.Cell>
              <Table.Cell>{q.revision}</Table.Cell>
              <Table.Cell>{q.employee}</Table.Cell>
              <Table.Cell>{dateFormat(q.received_date)}</Table.Cell>
              <Table.Cell>{q.description}</Table.Cell>
              <Table.Cell>{q.status}</Table.Cell>
              <Table.Cell>{dateFormat(q.due_date)}</Table.Cell>
              <Table.Cell>{q.due_time}</Table.Cell>
              <Table.Cell>{dateFormat(q.date_sent)}</Table.Cell>
              <Table.Cell><MainModal icon={true} id={q.id} header={'EDIT BID'}/></Table.Cell>
            </Table.Row>
          )}
      </Table>
      </div>
    )
  }
}

export default DeadBidsTable;

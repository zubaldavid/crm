import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables'
import NewItemModal from './NewItemModal'
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Menu,
  Table
} from 'semantic-ui-react'

const headers = [
  'Quote Number','Agency', 'Solictation', 'Revision', 'Point of Contact','Employee',
  'Received', 'Description', 'Status', 'Due Date','Due Time', 'Date Sent'
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

class OpenBidsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuotes: [],
      pageOfItems: [],
      load: false
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  compontentDidMount () {
    this.getQuotesList();
    console.log('Open Bids Table did mount.');
  }

  getQuotesList = () => {
    // setTimeout(() => {
    //   this.setState({load: true})
    // }, 3000);
    fetch('/api/openQ_bids')
    .then(res => res.json())
    .then(data => {
      this.setState({allQuotes:data});
      console.log("state", this.state.allQuotes)
    });
  }

  onChangePage(totalQuotes) {
      const { pageOfItems } = this.state;
      this.setState({pageOfItems:pageOfItems});
  }

  render() {
    const {pageOfItems, allQuotes, currentPage, totalPages, load} = this.state;
    const totalQuotes = allQuotes.length;
    const style = {
        edit: { marginLeft:'4%'},
        table: {width: '92%'},
        grid : {float: 'left'}
    };
    return (
      <div>
      <Button onClick={this.getQuotesList}>Get</Button>
        <NewItemModal/>
        <Grid style={style.grid}>
          <PaginateTables items={allQuotes} onChangePage={this.onChangePage}/>
          <Header> Total Pages: {totalQuotes}</Header>
          <Header> Pages {currentPage} / {totalPages}</Header>
        </Grid>
      <Table celled fixed compact size='small'>
        <TableHeader/>
        {this.state.load &&<Dimmer active>
          <Loader/>
        </Dimmer> }
          <Table.Body >
            {allQuotes.map(q =>
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

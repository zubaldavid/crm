import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables';
import NewItemModal from './NewItemModal';
import EditFileModal from './EditFileModal';
import {
  Dimmer,
  Grid,
  Loader,
  Menu,
  Table
} from 'semantic-ui-react'

const headers = [
  'ID', 'Quote Number','Agency', 'Solictation', 'Revision', 'Point of Contact','Employee',
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
      loading: true
    };
    this.getQuotesList = this.getQuotesList.bind(this);
  }

  getQuotesList (activePage) {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/openQ_bids/?page=' + activePage);
    console.log('Quote List:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({allQuotes:data});
      console.log("state", this.state.allQuotes);
    });
  }

  componentDidMount () {
      setTimeout(() => this.setState({ loading: false }), 1000); // simulates loading of data
      this.getQuotesList();
      console.log('Open Bids Table did mount.');
  }

  render() {
    const {allQuotes, currentPage, itemsPerPage, loading} = this.state;
    const totalNumQuotes = allQuotes.length;
    const numberofPages = totalNumQuotes - itemsPerPage;
    const style = {
        edit: { marginLeft:'4%'},
        table: {width: '92%'},
        grid : {float: 'left'},
        totalPages: {marginLeft: '25%', width: '100px'}
    };
    return (
      <div>
        <NewItemModal buttonName={'New Quote'} header={'NEW QUOTE'}/>
        <PaginateTables totalPages={10}  handlePagination={this.getQuotesList}/>

      <Table compact size='small'>
        <TableHeader/>
        {this.state.loading &&<Dimmer active>
          <Loader/>
        </Dimmer> }
            {allQuotes.map(q =>
              <Table.Row key={q.id}>
                <Table.Cell>{q.id}</Table.Cell>
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
                <Table.Cell><EditFileModal id={q.id} header={'quote'}/></Table.Cell>
              </Table.Row>
            )}

        </Table>
      </div>
    )
  }
}

export default OpenBidsTable

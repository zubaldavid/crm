import React, { Lazy, Component } from 'react';
import PropTypes from 'prop-types';
//import {getBidsList, getCount} from '../FetchCalls'
import {dateFormat, numberFormat} from '../../Formats';
import MainModal from '../MainModal';
import PaginateTables from '../../PaginateTables';
import PaymentsTableModal from '../PaymentsTableModal';
import {
  Button,
  Dimmer,
  Loader,
  Segment,
  Table
} from 'semantic-ui-react'

const headers = [
  'INV', 'Quote Number', 'Agency','Point of Contact','Description','Status',
  'Buyer', 'Employee', 'Date PO Rec','PO Number', 'Cost','Date Exp Del',
  'Date PO Ordered',,'', ''
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

class AwardsBidsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuotes: [],
      loading: true,
      count: 0
    };
    this.getQuotesList = this.getQuotesList.bind(this);
  }

  getQuotesList (activePage) {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/quote/awarded_bids/?page=' + activePage);
    console.log('Awards List:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({allQuotes:data});
      console.log("state", this.state.allQuotes);
    });
  }

  getCount () {
    fetch('/api/quote/awarded_bids/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
      console.log("state", this.state.count);
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1000); // simulates loading of data
    this.getCount();
    this.getQuotesList();
    console.log('Awards Table did mount.');
  }

  render() {
    const {allQuotes, loading, count} = this.state;
    const pages = Math.ceil(count / 20);
    return (
      <div>
      <MainModal button={'true'} buttonName={'New Payment'} header={'NEW PAYMENT'} />
      <PaginateTables totalPages={pages} handlePagination={this.getQuotesList}/>
      <Table compact size='small'>
        <TableHeader/>
        {this.state.loading &&<Dimmer active>
          <Loader/>
        </Dimmer> }
          {allQuotes.map(q =>
            <Table.Row key={q.id}>
              <Table.Cell>{q.invoice}</Table.Cell>
              <Table.Cell>{q.quote}</Table.Cell>
              <Table.Cell>{q.agency}</Table.Cell>
              <Table.Cell>{q.point_of_contact}</Table.Cell>
              <Table.Cell>{q.description}</Table.Cell>
              <Table.Cell>{q.status}</Table.Cell>
              <Table.Cell>{q.buyer}</Table.Cell>
              <Table.Cell>{q.employee}</Table.Cell>
              <Table.Cell>{dateFormat(q.date_po_received)}</Table.Cell>
              <Table.Cell>{q.po_number}</Table.Cell>
              <Table.Cell>{numberFormat(q.cost)}</Table.Cell>
              <Table.Cell>{dateFormat(q.date_exp_delivery)}</Table.Cell>
              <Table.Cell>{dateFormat(q.date_po_ordered)}</Table.Cell>
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
              <Table.Cell><PaymentsTableModal invoice={q.invoice} cost={q.cost}/></Table.Cell>
            </Table.Row>
          )}
        </Table>
      </div>
    )
  }
}

export default AwardsBidsTable;

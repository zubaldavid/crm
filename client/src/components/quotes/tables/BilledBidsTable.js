import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainModal from '../MainModal'
import {dateFormat, numberFormat, percentFormat} from '../../Formats';
import PaginateTables from '../../PaginateTables'
import {
  Button,
  Dimmer,
  Loader,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice', 'PO Number', 'Agency', 'Point of Contact', 'Description', 'Employee', 'Date Billed', 'Net Terms', 'Due Date',
  'Total Bill', 'State', 'City', 'Tracking #', 'Balance'
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


class BilledBidsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBilled: [],
      loading: true,
      count: 0
    };
    this.getBilledList = this.getBilledList.bind(this);
  }

  getBilledList (activePage) {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/quote/billed_bids/?page=' + activePage);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({allBilled:data});
      console.log("state", this.state.allBilled);
    });
  }

  getCount () {
    fetch('/api/quote/billed_bids/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
      console.log("state", this.state.count);
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1000); // simulates loading of data
    this.getCount();
    this.getBilledList();
    console.log('Awards Table did mount.');
  }

  render() {
    const {allBilled, loading, count} = this.state;
    const pages = Math.round(count / 20);
    return (
      <div>
      <PaginateTables  totalPages={pages} handlePagination={this.getBilledList}/>
        <Table compact size='small'>
          <TableHeader/>
          {this.state.loading &&<Dimmer active>
            <Loader/>
          </Dimmer> }
            {allBilled.map(q =>
              <Table.Row key={q.id}>
                <Table.Cell>{q.invoice}</Table.Cell>
                <Table.Cell>{q.po_number}</Table.Cell>
                <Table.Cell>{q.agency}</Table.Cell>
                <Table.Cell>{q.point_of_contact}</Table.Cell>
                <Table.Cell>{q.description}</Table.Cell>
                <Table.Cell>{q.employee}</Table.Cell>
                <Table.Cell>{dateFormat(q.date_billed)}</Table.Cell>
                <Table.Cell>{q.net_terms}</Table.Cell>
                <Table.Cell>{dateFormat(q.pay_due_date)}</Table.Cell>
                <Table.Cell>{q.total_bill}</Table.Cell>
                <Table.Cell>{q.state}</Table.Cell>
                <Table.Cell>{q.delivery_city}</Table.Cell>
                <Table.Cell>{q.tracking_number}</Table.Cell>
                <Table.Cell>{q.bill_balance}</Table.Cell>
                <Table.Cell><MainModal icon={true} id={q.id} header={'EDIT BILLED'}/></Table.Cell>
              </Table.Row>
            )}
        </Table>
      </div>
    )
  }
}

export default BilledBidsTable;

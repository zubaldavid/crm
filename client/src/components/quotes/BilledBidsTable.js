import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables'
import {
  Button,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice', 'Agency', 'PO #', 'Date Billed', 'ZipCode', 'Tax District', 'Delivery City','Tracking #',
  'NT Misc', 'Taxable', 'Subtotal', 'Sales Tax','Total', 'Due Date','Date Delivered',
  'Rec Date', 'Received Amount', 'Balance',
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
  render() {
    return (
      <div>
      <PaginateTables  handlePagination={this.getQuotesList}/>
        <Table celled compact size='small'>
          <TableHeader/>
          <Table.Body>
              
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default BilledBidsTable;

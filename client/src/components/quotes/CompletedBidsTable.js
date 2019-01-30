import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables'
import {
  Button,
  Grid,
  Header,
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


class CompletedBidsTable extends Component {
  render() {
    return (
      <div>
        <Table celled compact size='small'>
          <TableHeader/>
          <Table.Body>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default CompletedBidsTable;

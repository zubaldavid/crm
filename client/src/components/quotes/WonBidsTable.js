import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables'
import {
  Button,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice', 'Quote Number', 'Point of Contact', 'Solictation', 'Revision','Employee',
  'Received', 'Description', 'Status', 'Due Date','Due Time', 'Date Sent','Date PO',
  'PO Number', 'Comment',
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


class WonBidsTable extends Component {
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

export default WonBidsTable;

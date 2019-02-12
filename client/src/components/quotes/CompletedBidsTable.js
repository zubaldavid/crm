import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateTables from '../PaginateTables'
import {
  Header,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice','Quote Number', 'Agency', 'Cost','Subtotal',
  'Balance', 'Date Delivered', 'Received Date', 'Received Amount','Profit', 'Profit Margin',
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
      <Header>YTD Profit: </Header>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewItemModal from './NewItemModal';
import PaginateTables from '../PaginateTables'
import {
  Button,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice', 'Quote Number', 'Agency','Solictation', 'Point of Contact','Description','Status',
  'Buyer', 'Employee', 'Date PO Received','PO Number', 'Approx Cost','Date Exp Delivery',
  'Date PO Ordered', 'Date Billed', 'Comment',
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
  render() {
    return (
      <div>
      <NewItemModal/>
      <br/>
        <Table celled compact size='small'>
          <TableHeader/>
          <Table.Body>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default AwardsBidsTable;

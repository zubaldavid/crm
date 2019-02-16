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
    const style = {
      header: {float: 'right', marginLeft: '5%'},
    }
    return (
      <div>
      <PaginateTables   handlePagination={this.getQuotesList}/>
      <Header style={style.header}> YTD Ratio: 12.22%</Header>
      <Header style={style.header}> YTD Profit: 1,000,000</Header>
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

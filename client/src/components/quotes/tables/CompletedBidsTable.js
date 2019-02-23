import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainModal from '../MainModal'
import { dateFormat, percentFormat} from '../../Formats';
import PaginateTables from '../../PaginateTables'
import {
  Dimmer,
  Header,
  Loader,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice','Agency', 'Description','Employee','Description', 'Tracking #',
  'Total Bill', 'Received Date','Received Amount', 'Profit', 'Margin',' Balance'
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
  constructor(props) {
    super(props);
    this.state = {
      allCompleted: [],
      loading: true,
      count: 0,
      profit: 0,
      margin: 0
    };
    this.getCompletedList = this.getCompletedList.bind(this);
  }

  getCompletedList (activePage) {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/quote/completed_bids/?page=' + activePage);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({allCompleted:data});
      console.log("state", this.state.allCompleted);
    });
  }

  getCount () {
    fetch('/api/quote/completed_bids/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
    });
  }

  getProfit () {
    fetch('/api/quote/completed_bids/profit')
    .then(res => res.json())
    .then(data => {
      this.setState({profit:data[0].sum});
    });
  }

  getMargin () {
    fetch('/api/quote/completed_bids/margin')
    .then(res => res.json())
    .then(data => {
      this.setState({margin:data[0].avg});
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1000); // simulates loading of data
    this.getCount();
    this.getCompletedList();
    this.getMargin();
    this.getProfit();
    console.log('Completed Table did mount.');
  }

  render() {
    const {allCompleted, count, profit, margin} = this.state;
    const pages = Math.round(count / 20) + 1;
    const style = {
      header: {float: 'right', marginLeft: '5%'},
    }
    return (
      <div>
      <PaginateTables  totalPages={pages} handlePagination={this.getCompletedList}/>
      <Header style={style.header}> YTD Ratio: {percentFormat(margin)}</Header>
      <Header style={style.header}> YTD Profit: {profit}</Header>
        <Table compact size='small'>
          <TableHeader/>
          {this.state.loading &&<Dimmer active>
            <Loader/>
          </Dimmer> }
            {allCompleted.map(q =>
              <Table.Row key={q.id}>
                <Table.Cell>{q.invoice}</Table.Cell>
                <Table.Cell>{q.agency}</Table.Cell>
                <Table.Cell>{q.description}</Table.Cell>
                <Table.Cell>{q.employee}</Table.Cell>
                <Table.Cell>{q.description}</Table.Cell>
                <Table.Cell>{q.tracking_number}</Table.Cell>
                <Table.Cell>{q.total_bill}</Table.Cell>
                <Table.Cell>{dateFormat(q.received_date)}</Table.Cell>
                <Table.Cell>{q.received_amount}</Table.Cell>
                <Table.Cell>{q.profit}</Table.Cell>
                <Table.Cell>{percentFormat(q.profit_margin)}</Table.Cell>
                <Table.Cell>{q.balance}</Table.Cell>
                <Table.Cell><MainModal icon={true} id={q.id} header={'quote'}/></Table.Cell>
              </Table.Row>
            )}
        </Table>
      </div>
    )
  }
}

export default CompletedBidsTable;

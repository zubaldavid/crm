import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {dateFormat, numberFormat, removeMoneyFormat} from '../Formats';
import { PropTypes } from 'prop-types';
import PaginateTables from '../PaginateTables';
import {
  Button,
  Checkbox,
  Dimmer,
  Header,
  Grid,
  Icon,
  Input,
  Loader,
  Popup,
  Select,
  Segment,
  Table
} from 'semantic-ui-react'

const headers = [
  'Invoice','Vendor', 'Ordered', 'Delivered', 'Subtotal',
  'Shipping','Taxes', 'Total', 'Payment Method', 'Status'
]

function TableHeaders() {
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

class AllPaymentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [], loading: true, count:0, searchValue: ''
    };
  }

  handleSearch = () => {

  }

  getAllPayments = (activePage) => {
    if ( activePage === undefined) {activePage = 1;}
    let url = ('/api/quote/payments/all/?page=' + activePage);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({payments:data});
    })
  }

  getCount () {
    fetch('/api/quote/payments/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
      console.log("state", this.state.count);
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 800);
    this.getAllPayments();
    this.getCount();
  }

  render() {
    const {payments, count} = this.state;
    const pages = Math.ceil(count / 15);
    return (
      <Segment textAlign= 'left' style={style.mainSegment}>
      <div style={{marginLeft: '5%', width: '90%'}}>
      <Grid columns={2}>
      <Grid.Column>  <Segment compact raised textAlign='center' style={style.headerSegment}>
          <Header as='h3'>ALL PAYMENTS </Header>
        </Segment></Grid.Column>
        <Grid.Column>
          <Input  style={{float: 'right'}}'  placeholder='Search...'  name='searchValue' value={this.state.searchValue} onChange={this.handleSearch} />
          <Select compact value = options={searchOptions} defaultValue='Invoice' />
          <Button disable={!this.state.searchValue} primary type='submit'>Search</Button>
        </Grid.Column>
        </Grid>
        <Table compact definition >
          <TableHeaders/>
          {this.state.loading &&<Dimmer active>
            <Loader/>
          </Dimmer> }
          <Table.Body>
              {payments.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell>{d.invoice}</Table.Cell>
                  <Table.Cell>{d.vendor}</Table.Cell>
                  <Table.Cell>{dateFormat(d.date_ordered)}</Table.Cell>
                  <Table.Cell>{dateFormat(d.date_delivered)}</Table.Cell>
                  <Table.Cell>{d.subtotal}</Table.Cell>
                  <Table.Cell>{d.shipping}</Table.Cell>
                  <Table.Cell>{d.taxes}</Table.Cell>
                  <Table.Cell>{d.total}</Table.Cell>
                  <Table.Cell>{d.payment_method}</Table.Cell>
                  <Table.Cell>{d.status}</Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='9'>
              <Link to='/finance'>
                <Button floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='user' /> Add Payment
                </Button>
               </Link>
              <PaginateTables totalPages={pages}  handlePagination={this.getAllPayments}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </div>
      </Segment>
    )
  }
}

const searchOptions = [
  { key: '1', text: 'Invoice', value: 'invoice' },
  { key: 'org', text: 'Vendor', value: 'Vendor' },
  { key: 'site', text: 'Pay Method', value: 'Pay Method'},
]

const style = {
    edit: { marginLeft: '8%'},
    mainSegment: {marginLeft: '.5%', width: '99%', height: '90%'},
    headerSegment: {marginLeft: '12%', width: "50%"},
};

export default AllPaymentsTable;

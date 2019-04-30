import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import PaginateTables from '../PaginateTables';
import {
  Button,
  Checkbox,
  Dimmer,
  Header,
  Grid,
  Icon,
  Loader,
  Popup,
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
      payments: [], loading: true, count:0,
    };
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
      <Segment raised textAlign='center' style={style.headerSegment}>
        <Header as='h3'>ALL PAYMENTS </Header>
        </Segment>
        <Table  style={{marginLeft: '5%', width: '90%'}} compact definition >
          <TableHeaders/>
          {this.state.loading &&<Dimmer active>
            <Loader/>
          </Dimmer> }
          <Table.Body>
              {payments.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell>{d.invoice}</Table.Cell>
                  <Table.Cell>{d.vendor}</Table.Cell>
                  <Table.Cell>{d.date_ordered}</Table.Cell>
                  <Table.Cell>{d.date_delivered}</Table.Cell>
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
      </Segment>
    )
  }
}

const style = {
    edit: { marginLeft: '8%'},
    mainSegment: {marginLeft: '.5%', width: '99%', height: '90%'},
    headerSegment: {marginLeft: '40%', width: "20%"},
};

export default AllPaymentsTable;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {dateFormat, numberFormat, removeMoneyFormat} from '../Formats';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import TopHeader from '../TopHeader'
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
      payments: [], loading: true, count:0, searchValue: '', count: 0
    };
  }

  handleSearchSelect = (searchType) => {this.setState({searchType})}
  handleSearch = (e) => {this.setState({[e.target.name]: e.target.value})}

  getAllPayments = (url,activePage) => {
    if ( activePage === undefined) {activePage = 1;}
    let newUrl = (url + activePage);
    console.log("new url:",newUrl);
    fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Return data:",data);
      this.setState({payments:data});
      if (data.length === 0 )
        this.setState({count:1});
      else
        this.setState({count:data[0].count});
    })
  }

  // getCount (url) {
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({count:data[0].count});
  //     console.log("state", this.state.count);
  //   });
  // }


  searchPayments = (activePage) => {
    console.log("What is the page:", activePage);
    if ( activePage === undefined || typeof activePage === 'object') {activePage = 1;}
    if(!this.state.searchValue) {
        this.getAllPayments('/api/grainger/payments/all/?page=', activePage);
        //this.getCount('/api/grainger/payments/count');
    } else {
      console.log('/api/grainger/payments/search/?value=' + this.state.searchValue +'&'+ 'page=' + activePage);
      this.getAllPayments('/api/grainger/payments/search/?value=' + this.state.searchValue +'&'+ 'page=', activePage);
      //this.getCount('/api/grainger/payments/searchCount/?value=' + this.state.searchValue);
    }
  //  this.setState({searchValue: ''});
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 800);
    this.getAllPayments('/api/grainger/payments/all/?page=');
  //  this.getCount('/api/grainger/payments/count');
  }

  render() {
    const {payments, count} = this.state;
    const pages = Math.ceil(count / 15);
    return (
      <div>
      <TopHeader/>
      <div style={{marginLeft: '5%', width: '90%'}}>
      <Grid columns={2}>
      <Grid.Column>  <Segment compact raised textAlign='center' style={style.headerSegment}>
          <Header as='h3'>ALL GRAINGER PAYMENTS </Header>
        </Segment></Grid.Column>
        <Grid.Column>
            <Input style={{float: 'right'}}  placeholder='Search...' name='searchValue' value={this.state.searchValue} onChange={this.handleSearch} action>
            <input/>
            <Button primary type='submit' onClick={this.searchPayments}>Search</Button>
          </Input>
        </Grid.Column>
        </Grid>
        <Table small compact definition >
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
              <PaginateTables totalPages={pages}  handlePagination={this.searchPayments}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        {this.state.searchValue} {this.state.selected}
        </div>
      </div>
    )
  }
}

const searchOptions = [
  { label: 'Invoice', value: 'invoice' },
  { label: 'Vendor', value: 'vendor' },
  { label: 'Pay Method', value: 'pay'},
]

const style = {
    edit: { marginLeft: '8%'},
    mainSegment: {marginLeft: '.5%', width: '99%', height: '90%'},
    headerSegment: {marginLeft: '12%', width: "50%"},
};

export default AllPaymentsTable;

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
  '','First Name','Last Name', 'Email', 'Password', 'Quoter',
  'Grainger','Admin', '',
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

export class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
       users: [], quoters: {}, graingerAccess: {},admins: {},
       loading: true, count:0,
    };
  }

  getUsersList =  (activePage) => {
    console.log("Page:",activePage);
    if ( activePage === undefined) {activePage = 1;}
    console.log("After if:",activePage)
    let url = ('/api/users/?page=' + activePage);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({users:data});
    })
  }

  getCount () {
    fetch('/api/users/count')
    .then(res => res.json())
    .then(data => {
      this.setState({count:data[0].count});
      console.log("state", this.state.count);
    });
  }

  openEditForm (id) {
      //this.props.editUser(id);
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 800); // simulates loading of data
    this.getCount();
    this.getUsersList();
    console.log('Users Table did mount.');
  }

  render() {
    const {users, count} = this.state;
    const pages = Math.ceil(count / 15);
    console.log('Total Pages:', pages);
    const style = {
        edit: { marginLeft: '8%'},
        mainSegment: {marginLeft: '.5%', width: '99%', height: '90%'},
        headerSegment: {marginLeft: '40%', width: "20%"},
    };
    return (
      <Segment  textAlign= 'left' style={style.mainSegment}>
      <Segment raised textAlign='center' style={style.headerSegment}>
        <Header>ALL USERS </Header>
        </Segment>
      <br/>
        <Table  style={{marginLeft: '5%', width: '90%'}} compact definition  >
          <TableHeaders/>
          {this.state.loading &&<Dimmer active>
            <Loader/>
          </Dimmer> }
          <Table.Body>
              {users.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell collapsing>
                    <Checkbox slider name='quoter'checked={d.active}/>
                  </Table.Cell>
                  <Table.Cell>{d.first_name}</Table.Cell>
                  <Table.Cell>{d.last_name}</Table.Cell>
                  <Table.Cell>{d.email}</Table.Cell>
                  <Table.Cell>{d.password}</Table.Cell>
                  <Table.Cell>
                    <Checkbox slider name='quoter' checked={d.quoter}/>
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox slider name='graingerAccess' checked={d.grainger_access}/>
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox slider name='admin' checked={d.admin} />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name='edit' onClick={this.openEditForm(d.id)}/>
                  </Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='8'>
              <Link to='/create-user'>
                <Button floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='user' /> Add User
                </Button>
               </Link>
              <PaginateTables totalPages={pages}  handlePagination={this.getUsersList}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    );
  }
}


export default UsersTable

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  Checkbox,
  Icon,
  Popup,
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
       users: [],
       quoters: {},
       graingerAccess: {},
       admins: {}
    };
  }

  changeQuoters = (e) => {
    let quoters = this.state.quoters;
    quoters[e.target.name] = e.target.value;
    console.log(e.target.name, e.target.value);
  }

  getUsersList = () => {
    fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      this.setState({users:data});
      console.log("state", this.state.users)
    })
  }

  editUser = (id, e) => {
      console.log('editing user');
      this.props.edituser(this.props.index); // Call to AddNewUser form
  }

  removeUser = (id, e) => {
    fetch('/api/users', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    this.getUsersList();
  }

  componentDidMount () {
    this.getUsersList();
    console.log('Users Table did mount.');
  }

  render() {
    const {users} = this.state;
    const style = {
        edit: { marginLeft: '8%'},
    };
    return (
      <div>
        <Table celled compact definition>
          <TableHeaders/>
          <Table.Body>
              {users.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell collapsing>
                    <Checkbox slider
                    name='quoter'
                    checked={d.admin}
                  /></Table.Cell>
                  <Table.Cell>{d.first_name}</Table.Cell>
                  <Table.Cell>{d.last_name}</Table.Cell>
                  <Table.Cell>{d.email}</Table.Cell>
                  <Table.Cell>{d.password}</Table.Cell>
                  <Table.Cell>
                    <Checkbox slider
                      name='quoter'
                      checked={d.quoter}
                      value={this.state.quoters.quoter}
                      onChange={this.changeQuoters} />
                  </Table.Cell>

                  <Table.Cell>
                    <Checkbox slider
                      name='quoter'
                      checked={d.grainger_access}
                      /></Table.Cell>

                  <Table.Cell>
                    <Checkbox slider
                      name='quoter'
                      checked={d.admin}
                      /></Table.Cell>

                  <Table.Cell>
                    <Button onClick={this.props.edituser}><Icon name='edit'/></Button>
                  </Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
          <Table.Footer compact fullWidth>
           <Table.Row>
             <Table.HeaderCell colSpan='9'>
               <Button floated='right' primary size='small'>
                      Save
               </Button>
             </Table.HeaderCell>
           </Table.Row>
         </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default UsersTable

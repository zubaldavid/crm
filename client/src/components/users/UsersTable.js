import React, { Component } from 'react';
import {
  Button,
  CheckBox,
  Icon,
  Popup,
  Table
} from 'semantic-ui-react'

const headers = [
  'First Name','Last Name', 'Email', 'Email', 'Quoter','General',
  'Grainger',
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
       users: []
    };
  }

  componentWillMount() {
    console.log('First call to render users table');
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
      this.props.editUser(this.props.index); // Call to AddNewUser form
  }

  removeUser = (id, e) => {
    fetch('/api/users', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    this.getUsersList();
  }

  compontentDidMount = () => {
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
        <Button onClick={this.getUsersList}>Get</Button>
        <Table celled>
          <TableHeaders/>
          <Table.Body>
              {users.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell>{d.first_name}</Table.Cell>
                  <Table.Cell>{d.last_name}</Table.Cell>
                  <Table.Cell>{d.email}</Table.Cell>
                  <Table.Cell>{d.password}</Table.Cell>
                  <Button onClick={this.props.editUser}><Icon name='edit'/></Button>
                  <Popup style={{height:'45px'}}
                  trigger={<Button onClick={this.removeUser.bind(this, d.id)} color='red'><Icon name='remove'/></Button>}
                  content='Are you sure you want to delete?'
                  position='top left'
                  />
                </Table.Row>
              )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default UsersTable

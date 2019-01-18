import React, { Component } from 'react';
import {
  Button,
  Table
} from 'semantic-ui-react'

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
       users: []
    };
  }

  getUsersList = () => {
    fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      this.setState({users:data});
      console.log("state", this.state.users)
    })
  }

  compontentDidMount () {
    this.getUsersList();
  }

  render() {
    const {users} = this.state;
    return (
      <div>
          <Button onClick={this.getUsersList}>Get</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First</Table.HeaderCell>
              <Table.HeaderCell>Last</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Password</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
              {users.map(d =>
                <Table.Row key={d.id}>
                  <Table.Cell>{d.first_name}</Table.Cell>
                  <Table.Cell>{d.last_name}</Table.Cell>
                  <Table.Cell>{d.email}</Table.Cell>
                  <Table.Cell>{d.password}</Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default UsersTable

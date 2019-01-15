import React, { Component } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Image,
  Modal,
  Table
} from 'semantic-ui-react'

class UsersModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showTable: true
    };
  }

  openForm = () => {
    this.setState({
      showForm: true,
      showTable: false
    });
  }

  getUsersList = () => {
    fetch('api/users')
    .then(res => res.json())
    .then(res => {
        var usersList = res.map(r => r.first_name);
        this.setState({ usersList});
    });
  };

  compontentDidMount () {
    this.getUsersList();
  }

  render() {
    const style = {
      modal : {
        marginTop: '.5%',
        height: '80%',
        width: '60%'
      },
      button: {
        marginLeft: '5%',
        float:'left'
      },
      head: {
        alignItems: 'center'
      }
    };
    return (
      <Modal style={style.modal} trigger={<Button style={style.button}> Users </Button>}>
        <Modal.Header syle={style.head}>USERS</Modal.Header>
         <Modal.Content>
          { this.state.showTable && <UserTable/> }
          { this.state.showForm && <AddNewUser/> }
         </Modal.Content>
         <Modal.Actions>
         <Button primary onClick={this.openForm}>
            <Icon name='plus'/>
                Add User
            </Button>
         </Modal.Actions>
      </Modal>
    )
  }
}

class AddNewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      usersList: [],
      showTable: false,
      showForm: true
    };
  }

  handleInputChange = (e) => {
      this.setState({ firstName: e.target.value});
      this.setState({ lastName: e.target.value});
      this.setState({ email: e.target.value});
      this.setState({ password: e.target.value});
  };

  handleAddUser = () => {
    fetch('api/users', {
      method: 'post',
      headers: {'Content-Type': 'aplication.json'},
      body: JSON.stringify({user: this.state.firstName})
    })
    .then(res => res.json())
    .then(res => {
    //  this.getUsersList();
      this.setState({firstName : ''});
    });
  };

  render() {
    const style = {
        form : {
        left: '20%',
        height:'60%',
        width: '60%',
      },
        button: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }
    };
    return (
      <Form style={style.form}>
         <Form.Field>
           <label>First Name</label>
           <input placeholder='First Name'
            value={this.state.firstName}
            onChange={this.handleInputChange}
           />
         </Form.Field>
         <Form.Field>
           <label>Last Name</label>
           <input placeholder='Last Name' />
         </Form.Field>
         <Form.Field>
           <label>Email</label>
           <input placeholder='Email' />
         </Form.Field>
         <Form.Field>
           <label>Password</label>
           <input placeholder='Password' />
         </Form.Field>
         <Button style={style.button} type='submit' onClick={this.handleAddUser}>Submit</Button>
      </Form>
    )
  }
}

class UserTable extends React.Component {
  render() {
    return (
      <div>
      <Table striped>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Name</Table.HeaderCell>
             <Table.HeaderCell>Date Joined</Table.HeaderCell>
             <Table.HeaderCell>E-mail</Table.HeaderCell>
             <Table.HeaderCell>Called</Table.HeaderCell>
           </Table.Row>
         </Table.Header>

         <Table.Body>
           <Table.Row>
             <Table.Cell>John Lilki</Table.Cell>
             <Table.Cell>September 14, 2013</Table.Cell>
             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
             <Table.Cell>No</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Jamie Harington</Table.Cell>
             <Table.Cell>January 11, 2014</Table.Cell>
             <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
             <Table.Cell>Yes</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Jill Lewis</Table.Cell>
             <Table.Cell>May 11, 2014</Table.Cell>
             <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
             <Table.Cell>Yes</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>John Lilki</Table.Cell>
             <Table.Cell>September 14, 2013</Table.Cell>
             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
             <Table.Cell>No</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>John Lilki</Table.Cell>
             <Table.Cell>September 14, 2013</Table.Cell>
             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
             <Table.Cell>No</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Jamie Harington</Table.Cell>
             <Table.Cell>January 11, 2014</Table.Cell>
             <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
             <Table.Cell>Yes</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Jill Lewis</Table.Cell>
             <Table.Cell>May 11, 2014</Table.Cell>
             <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
             <Table.Cell>Yes</Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>John Lilki</Table.Cell>
             <Table.Cell>September 14, 2013</Table.Cell>
             <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
             <Table.Cell>No</Table.Cell>
           </Table.Row>
         </Table.Body>
        </Table>
      </div>
    )
  }
}

export default UsersModal

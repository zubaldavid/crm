import React, { Component } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Image,
  Label,
  Modal,
  Table
} from 'semantic-ui-react'

class UsersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showTable: true,
    };
  }

  openForm = () => {
    this.setState({
      showForm: true,
      showTable: false
    });
  }

  render() {
    const style = {
      modal : { marginTop: '.5%', height: '80%', width: '60%'},
      button : { marginLeft: '5%', float:'left'},
      adduserButton : {float:'right'},
      head : { alignItems: 'center'}
    };
    return (
      <Modal style={style.modal} trigger={<Button style={style.button}> <Icon name='user'/> Users </Button>}>
        <Modal.Header syle={style.head}>AVIATE USERS
        <Button primary onClick={this.openForm} style={style.adduserButton} >
           <Icon name='plus'/> Add User
           </Button>
        </Modal.Header>
         <Modal.Content>
          { this.state.showTable && <UserTable/> }
          { this.state.showForm && <AddNewUser/> }
         </Modal.Content>
      </Modal>
    )
  }
}

class AddNewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newFirst: '', newLast: '', newEmail: '', newPassword: '', showTable: false, showForm: true
    };
  }

  handleInputChange = (e) => {
    this.setState({
      newFirst: e.target.value, newLast: e.target.value,
      newEmail: e.target.value, newPassword: e.target.value
    });
  };

  handleAddUser = () => {
    fetch('api/users', {
      method: 'post',
      headers: {'Content-Type': 'application.json'},
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
        form : {  left: '20%', height:'60%', width: '60%' },
        button: { flex: 1, flexDirection: 'row', alignItems: 'center'}
    };
    return (
      <Form style={style.form}>
         <Form.Field>
           <label>First Name</label>
           <input placeholder='First Name' value={this.state.newFirst} onChange={this.handleInputChange}/>
         </Form.Field>
         <Form.Field>
           <label>Last Name</label>
           <input placeholder='Last Name' value={this.state.newLast} onChange={this.handleInputChange}/>
         </Form.Field>
         <Form.Field>
           <label>Email</label>
           <input placeholder='Email' value={this.state.newEmail} onChange={this.handleInputChange} />
         </Form.Field>
         <Form.Field>
           <label>Password</label>
           <input placeholder='Password' value={this.state.newPassword} onChange={this.handleInputChange}/>
         </Form.Field>
         <Button style={style.button} type='submit' onClick={this.handleAddUser}>Submit</Button>
      </Form>
    )
  }
}

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       firstList: [],
       lastList: [],
       emailList: [],
       passwordList: [],
       users: []
    };
  }

  getUsersList = () => {
    fetch('api/users')
    .then(res => res.json())
    .then(res => {
      var firstList = res.map(r => r.first_name);
      var lastList = res.map(r => r.last_name);
      var emailList = res.map(r => r.email);
      var passwordList = res.map(r => r.password);
      var users = res.map(r => r);
      this.setState({firstList, users});
    });
  };

  compontentDidMount () {
    this.getUsersList();
  }

  render() {
    return (
      <div>
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
            <Table.Row>
              {this.state.firstList.map(user =>
                <div key={user.id}>first:{user.first_name} last:{user.last_name} {user.email} {user.password}</div>
              )}
            </Table.Row>
              <br/>
              <br/>
              <Header> where is the data?</Header>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default UsersModal

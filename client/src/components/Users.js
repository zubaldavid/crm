import React, { Component } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Image,
  Modal } from 'semantic-ui-react'

class UsersModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
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
      }
    };
    return (
      <Modal style={style.modal} trigger={<Button style={style.button}> Users </Button>}>
        <Modal.Header centered>Users</Modal.Header>
         <Modal.Content>
          <AddNewUser/>
         </Modal.Content>
         <Modal.Content>
             <Input type="select" onChange={this.getUsersList}>
                { this.state.usersList === 0 && <option> No cities added yet</option>}
                { this.state.usersList > 0 &&  <option> Select a user</option>}
                { this.state.usersList.map((user,i) => <option key={i}> {user} </option>)}
             </Input>
         </Modal.Content>
         <Modal.Actions>
           <NewUserButton/>
         </Modal.Actions>
      </Modal>
    )
  }
}

class NewUserButton extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div>
        <Button primary>
           <Icon name='plus'/>
           Add User
        </Button>
      </div>
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
      usersList: []
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

export default UsersModal

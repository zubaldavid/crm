import React, { Component } from 'react';
import {
  Button,
  Form,
} from 'semantic-ui-react'


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

export default AddNewUser

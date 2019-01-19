import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid
} from 'semantic-ui-react'

class AddNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFirst: '', newLast: '', newEmail: '', newPassword: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
      console.log('Add New User did mount.');
  }

  handleInputChange (e) {
    const target = e.target;
    const value = target.value;
    const name  = target.name;
    this.setState({ [ name ] : value });
  }

  handleSubmit = (event) => {
      alert('First: ' + this.state.newFirst +
             ' Last: ' + this.state.newLast  +
             ' Email : ' + this.state.newEmail
      );
      event.preventDefault();
  }

  handleAddUser = (e) => {
    var newUser = {
      first_name: this.state.newFirst,
      last_name : this.state.newLast,
      email:this.state.newEmail,
      password: this.state.newPassword,
    }

    fetch('api/users', {
      method: 'post',
      headers: {'Content-Type': 'application.json'},
      body: JSON.stringify({ newUser})
    })
    .then(res => res.json())
    .then(res => { this.setState({newFirst: '', newLast: '', newEmail: '', newPassword: ''})
    });

    alert('You have submitted a new user - ' +
            'First: ' + this.state.newFirst +
           ' Last: ' + this.state.newLast  +
           ' Email : ' + this.state.newEmail
    );
    e.preventDefault();
  };

  render() {
    const style = {
        form : {  left: '20%', height:'60%', width: '60%' },
        button: {}
    };
    return (
      <Form style={style.form}>
         <Form.Field>
           <label>First Name</label>
           <input placeholder='First Name' type='text' name='newFirst' value={this.state.newFirst}  onChange={this.handleInputChange}/>
         </Form.Field>
         <Form.Field>
           <label>Last Name</label>
           <input placeholder='Last Name' type='text' name='newLast' value={this.state.newLast} onChange={this.handleInputChange}/>
         </Form.Field>
         <Form.Field>
           <label>Email</label>
           <input placeholder='Email' name='newEmail' value={this.state.newEmail} onChange={this.handleInputChange}/>
         </Form.Field>
         <Form.Field>
           <label>Password</label>
           <input placeholder='Password' name='newPassword' value={this.state.newPassword} onChange={this.handleInputChange}/>
         </Form.Field>
          <Grid.Row centered>
            <Button primary style={style.button} type='submit' onClick={this.handleAddUser}>Submit</Button>
          </Grid.Row>
      </Form>
    )
  }
}

export default AddNewUser

import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react'

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFirst: '',
      newLast: '',
      newEmail: '',
      newPassword: '',
      showComplete: false,
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
      this.setState({
       newFirst: '', newLast: '', newEmail: '', newPassword: '', showComplete: true})
  }

  handleAddUser = () => {
    fetch('/api/users', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        newFirst: this.state.newFirst,
        newLast : this.state.newLast,
        newEmail:this.state.newEmail,
        newPassword: this.state.newPassword
      })
    })
    .then(res => res.json())
    .then(res => { this.setState({
      newFirst: '', newLast: '', newEmail: '', newPassword: '', showComplete:true})
    });
  };

  render() {
    const style = {
        form : {  left: '20%', height:'60%', width: '60%' },
    };
    return (
      <div>
      { this.state.showComplete && <Submitted/>}
      <br/>
      <br/>
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
         <br/>
          <Grid centered>
            <Button primary style={style.button} type='submit' onClick={this.handleAddUser}>Submit</Button>
          </Grid>
        </Form>
        </div>
    )
  }
}

class Submitted extends Component {
  render() {
    const style = {
        icon : { marginRight: '4%'},
        segment: {width:'40%'}
    };
    return (
      <div>
        <Grid centered>
          <Segment style={style.segment} inverted color='green'>
            <Icon style={style.icon} name='check'/>
            New User Created!
          </Segment>
        </Grid>
      </div>
    )
  }
}

export default AddNewUser

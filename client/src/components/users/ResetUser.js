import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import UsersTable from './UsersTable'
import Select from 'react-select';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Rail,
  Segment
} from 'semantic-ui-react'

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails:[], errors: [], email: '', password: '', successMessage: ''
    };
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value =  target.value;
    const name = target.name;
    this.setState({[name] : value});
  }

  handleEmail= (email) => this.setState({email });

  handleUserReset = (e) => {
    e.preventDefault();
    fetch('/api/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email.value, password: this.state.password,
      })
    }).then(response => response.json())
    .then((data) => {
        if (data === undefined || data.length == 0) {
          this.setState({errors: []});
          const message = "You have successfully reset: " + this.state.email;
          this.setState({successMessage: message});
        } else
            this.setState({errors: data.errors});
    })
    setTimeout(() => {
      return <Redirect to='/users'/>
    }, 2500);
  }

  getAllUsers = () => {
    let url = ('/api/users/emails');
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Users:",data);
        let users = data.map(r => ({label: r.email, value: r.email}));
        this.setState({emails: users});
    })
  }

  componentDidMount() {
    this.getAllUsers();
    console.log('Add New User did mount.');
  }

  render() {
    const style = {
        form : {top:'2em', bottom: '2em', left:'20%', width: '60%' },
        segment : {top: '1em', left: '30%', width: '40%', height:'35em'},
    };
    const {errors, emails} = this.state;
    return (
      <Segment style={{height: '50%'}}inverted color='blue' secondary>
      <Rail internal position='right'>
      { <Message hidden={!this.state.successMessage} color='green' size='small'>{this.state.successMessage}</Message>}
      {errors.map(e =>
        <Message color='red' size='mini'> *{e.msg}</Message>
      )}
      </Rail>
      <Segment textAlign='center' raised  style={{left: '40%',width: '20%'}}>
        <Header> RESET USER</Header>
      </Segment>
      <Segment textAlign='center' style={style.segment} raised>
      <br/>
      <br/>
      <Form style={style.form} >
         <Form.Field>
           <label>Email</label>
           <Select fluid placeholder='Email' name='email' options={emails} value={this.email} onChange={this.handleEmail}/>
         </Form.Field>
         <br/>
         <Form.Field required>
           <label>Password</label>
           <input placeholder='Password' type='password' name='password' value={this.state.password} onChange={this.handleInputChange}/>
          </Form.Field>
          <br/>
          <br/>
          <br/>
          <Grid centered>
            <Button primary type='submit' onClick={this.handleUserReset}>
            <Icon name='redo'/>
              Reset
            </Button>
          </Grid>
        </Form>
        <br/>
        </Segment>
        </Segment>
    )
  }
}

AddNewUser.propTypes =  {
  showTableAgain: PropTypes.func
}

export default AddNewUser;

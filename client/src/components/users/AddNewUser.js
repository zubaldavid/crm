import React, { Component } from 'react';
import classnames from 'classnames'
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
    if(!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name] : e.target.value,
        errors
      });
    } else {
      this.setState({  [e.target.name] : e.target.value});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if(this.state.newFirst === '') errors.newFirst = "First Name can't be empty";
    if(this.state.newLast === '') errors.newLast = "Last Name can't be empty";
    if(this.state.newEmail === '') errors.newEmail = "Email can't be empty";
    if(this.state.newPassword === '') errors.newPassword = "Password can't be empty";
    this.setState({ errors });
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
      <Form style={style.form} onSubmit={this.handleSubmit}>
         <Form.Field className={classnames('field', {error: !!this.state.errors.newFirst})}>
           <label>First Name</label>
           <input placeholder='First Name' type='text' name='newFirst' value={this.state.newFirst}  onChange={this.handleInputChange}/>
         </Form.Field>
         <span>{this.state.errors.newFirst}</span>
         <Form.Field className={classnames('field', {error: !!this.state.errors.newLast})}>
           <label>Last Name</label>
           <input placeholder='Last Name' type='text' name='newLast' value={this.state.newLast} onChange={this.handleInputChange}/>
         </Form.Field>
         <span>{this.state.errors.newLast}</span>
         <Form.Field className={classnames('field', {error: !!this.state.errors.newFirst})}>
           <label>Email</label>
           <input placeholder='Email' name='newEmail' value={this.state.newEmail} onChange={this.handleInputChange}/>
         </Form.Field>
         <span>{this.state.errors.newEmail}</span>
         <Form.Field className={classnames('field', {error: !!this.state.errors.newFirst})}>
           <label>Password</label>
           <input placeholder='Password' name='newPassword' value={this.state.newPassword} onChange={this.handleInputChange}/>
         </Form.Field>
         <span>{this.state.errors.newPassword}</span>
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

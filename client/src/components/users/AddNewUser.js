import React, { Component } from 'react';
import UsersTable from './UsersTable'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComplete: false,
      showForm: true,
      showTable: false,
      fields: {},
      errors: {}

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentDidMount() {
      console.log('Add New User did mount.');
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleAddUser = (e) => {
    e.preventDefault();
    if(this.validateForm()) {
      //let fields = this.state.fields;
      fetch('/api/users', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          //[e.target.name] : this.state.fields[e.target.name]
          newFirst: this.state.newFirst,
          newLast : this.state.newLast,
          newEmail:this.state.newEmail,
          newPassword: this.state.newPassword
        })
      })
      let fields = {};
      fields["newFirst"] = "";
      fields["newLast"] = "";
      fields["newEmail"] = "";
      fields["newPassword"] = "";
      this.setState({fields: fields, showComplete:true, showTable:true, showForm:false});
    //  this.props.showBoardAgain();
    }
  }

  validateForm () {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["newFirst"]) {
      formIsValid = false;
      errors["newFirst"] = "Enter a first name";
    }

    if(!fields["newLast"]) {
      formIsValid = false;
        errors["newLast"] = "Enter a last name";
    }

    if(!fields["newEmail"]) {
      formIsValid = false;
        errors["newEmail"] = "Enter an email";
    }

    if(!fields["newPassword"]) {
      formIsValid = false;
        errors["newPassword"] = "Enter a password";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  render() {
    const style = {
        form : { left: '20%', height:'60%', width: '60%' },
        error: { color:'red' }
    };
    return (
      <div>
      { this.state.showComplete && <Submitted/>}
      <br/>
      <br/>
      { this.state.showForm &&
      <Form style={style.form} onSubmit={this.handleSubmit}>
         <Form.Field>
           <label>First Name</label>
           <input placeholder='First Name' type='text' name='newFirst' value={this.state.fields.newFirst}  onChange={this.handleInputChange}/>
           <span style={style.error}>{this.state.errors.newFirst}</span>
         </Form.Field>
         <Form.Field>
           <label>Last Name</label>
           <input placeholder='Last Name' type='text' name='newLast' value={this.state.fields.newLast} onChange={this.handleInputChange}/>
         <span style={style.error}>{this.state.errors.newLast}</span>
         </Form.Field>
         <Form.Field>
           <label>Email</label>
           <input placeholder='Email' name='newEmail' value={this.state.fields.newEmail} onChange={this.handleInputChange}/>
         <span style={style.error}>{this.state.errors.newEmail}</span>
         </Form.Field>
         <Form.Field>
           <label>Password</label>
           <input placeholder='Password' name='newPassword' value={this.state.fields.newPassword} onChange={this.handleInputChange}/>
           <span style={style.error}>{this.state.errors.newPassword}</span>
          </Form.Field>
         <br/>
          <Grid centered>
            <Button primary style={style.button} type='submit' onClick={this.handleAddUser}>Submit</Button>
          </Grid>
        </Form>
        }
        {this.state.showTable && <UsersTable/>}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersTable from './UsersTable'
import {
  Button,
  Checkbox,
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
      showComplete: false,showForm: true,showTable: false,
      fields: {}, checks: {}, errors: {}, singleUser:{},
      grainger: false, quoter: false, admin: false, active: true,

    };
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    fields[name] = value;
    this.setState({fields});
  }
  // CheckBoxes
  handleGrainger = () => this.setState({ grainger: !this.state.grainger });
  handleQuoter = () => this.setState({ quoter: !this.state.quoter });
  handleAdmin = () => this.setState({ admin: !this.state.admin });
  handleActive = () => this.setState({ active: !this.state.active });

  handleAddUser = (e) => {
    e.preventDefault();
     if(this.validateForm()) {
      fetch('/api/users', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          newFirst: this.state.fields.newFirst,
          newLast : this.state.fields.newLast,
          newEmail:this.state.fields.newEmail,
          newPassword: this.state.fields.newPassword,
          grainger: this.state.grainger,
          quoter: this.state.quoter,
          admin: this.state.admin,
          active: this.state.active,
        })
      })
      console.log("First Name: ", this.state.fields.newFirst);
      let fields = {};
      fields["newFirst"] = "";
      fields["newLast"] = "";
      fields["newEmail"] = "";
      fields["newPassword"] = "";
      setTimeout(() => {
        this.setState({fields: fields, showComplete:true})
      }, 1000);
      setTimeout(() => {
        // Prop used to show Users table
        this.props.showTableAgain();
      }, 2500);
    }
  }

  handleEditUser = (id, e) => {
    e.preventDefault();
     if(this.validateForm()) {
      let url = ('/api/users/edit/?id=' + id)
      fetch('/api/users', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          newFirst: this.state.fields.newFirst,
          newLast : this.state.fields.newLast,
          newEmail:this.state.fields.newEmail,
          newPassword: this.state.fields.newPassword,
          grainger: this.state.grainger,
          quoter: this.state.quoter,
          admin: this.state.admin,
          active: this.state.active,
        })
      })
      console.log("First Name: ", this.state.fields.newFirst);
      let fields = {};
      fields["newFirst"] = "";
      fields["newLast"] = "";
      fields["newEmail"] = "";
      fields["newPassword"] = "";
      setTimeout(() => {
        this.setState({fields: fields, showComplete:true})
      }, 1000);
      setTimeout(() => {
        // Prop used to show Users table
        this.props.showTableAgain();
      }, 2500);
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

  getSingleUser = (id) => {
    let url = ('/api/users/user/?id=' + id);
    fetch(url)
    .then(res => res.json())
    .then(user => {
        this.setState({singleUser: user});
        console.log(this.state.singleUser);
        this.state.fields.newFirst = this.state.singleUser[0].first_name;
    })
  }

  checkIfEdit () {
    if (this.props.id > 0) this.getSingleUser(this.props.id);
  }

  componentDidMount() {
    this.checkIfEdit();
    console.log('Add New User did mount.');
  }

  render() {
    const style = {
        form : { left: '10%', height:'80%', width: '80%' },
        error: { color:'red' }
    };
    return (
      <div>
      { this.state.showComplete && <Submitted/>}
      <br/>
      <br/>
      <Form style={style.form} >
        <Form.Group widths='equal'>
           <Form.Field required>
             <label>First Name</label>
             <input placeholder='First Name' type='text' name='newFirst' value={this.state.fields.newFirst}  onChange={this.handleInputChange}/>
             <span style={style.error}>{this.state.errors.newFirst}</span>
           </Form.Field>
           <Form.Field required>
             <label>Last Name</label>
             <input placeholder='Last Name' type='text' name='newLast' value={this.state.fields.newLast} onChange={this.handleInputChange}/>
             <span style={style.error}>{this.state.errors.newLast}</span>
           </Form.Field>
         </Form.Group>
         <Form.Group widths='equal'>
           <Form.Field required>
             <label>Email</label>
             <input placeholder='Email' type='email' name='newEmail' value={this.state.fields.newEmail} onChange={this.handleInputChange}/>
             <span style={style.error}>{this.state.errors.newEmail}</span>
           </Form.Field>
           <Form.Field required>
             <label>Password</label>
             <input placeholder='Password' type='password' name='newPassword' value={this.state.fields.newPassword} onChange={this.handleInputChange}/>
             <span style={style.error}>{this.state.errors.newPassword}</span>
            </Form.Field>
          </Form.Group>
          <br/>
          <Form.Group widths='equal'>
            <Form.Field>
              <label> Active User</label>
               <Segment compact><Checkbox toggle name='active' type='checkbox' checked={this.state.active} onChange={this.handleActive} /> </Segment>
            </Form.Field>
            <Form.Field>
              <label> Grainger Member </label>
               <Segment compact><Checkbox toggle name='grainger' type='checkbox' checked={this.state.grainger} onChange={this.handleGrainger} /> </Segment>
            </Form.Field>
            <Form.Field>
              <label> Quoter </label>
               <Segment compact><Checkbox toggle name='quoter' type='checkbox' checked={this.state.quoter} onChange={this.handleQuoter}/> </Segment>
            </Form.Field>
            <Form.Field>
              <label> Admin Rights </label>
               <Segment compact> <Checkbox toggle name='admin' type='checkbox' checked={this.state.admin} onChange={this.handleAdmin}/> </Segment>
            </Form.Field>
          </Form.Group>
         <br/>
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

AddNewUser.propTypes =  {
  showTableAgain: PropTypes.func
}

export default AddNewUser;

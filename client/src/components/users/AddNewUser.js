import React, { Component } from 'react';
import {Route, Redirect, Link} from 'react-router-dom'
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
  Message,
  Rail,
  Segment
} from 'semantic-ui-react'


class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComplete: false,showForm: true,showTable: false,
      fields: {}, checks: {}, errors: [], singleUser:{},
      grainger: false, quoter: false, admin: false, active: true, successMessage: ''
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
    fetch('/api/users/create', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        newFirst: this.state.fields.newFirst, newLast : this.state.fields.newLast,
        newEmail:this.state.fields.newEmail, newPassword: this.state.fields.newPassword,
        grainger: this.state.grainger, quoter: this.state.quoter, admin: this.state.admin, active: this.state.active,
      })
    }).then(response => response.json())
    .then((data) => {
        if (data === undefined || data.length == 0) {
          this.setState({errors: []});
          const message = "You have successfully added: " + this.state.fields.newFirst + ' ' + this.state.fields.newLast;
          this.setState({successMessage: message});
          let fields = {};
          fields["newFirst"] = " ";
          fields["newLast"] = "";
          fields["newEmail"] = " ";
          fields["newPassword"] = " ";
          console.log("What is the state of the fields?", this.state.fields);
        } else
            this.setState({errors: data.errors});
    })
    return <Link to='/users'></Link>
  }

  handleEditUser = (id, e) => {
    e.preventDefault();
      let url = ('/api/users/edit/?id=' + id)
      fetch('/api/users', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          newFirst: this.state.fields.newFirst, newLast : this.state.fields.newLast,
          newEmail:this.state.fields.newEmail, newPassword: this.state.fields.newPassword,
          grainger: this.state.grainger, quoter: this.state.quoter, admin: this.state.admin, active: this.state.active,
        })
      })

      setTimeout(() => {
      }, 2500);
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

  componentDidMount() {
    console.log('Add New User did mount.');
  }

  render() {
    const style = {
        form : {top:'2em', bottom: '2em', left:'15%', width: '70%' },
        segment : {top: '1em', left: '25%', width: '50%', height:'35em'},
        error: { color:'red' }
    };
    const {errors} = this.state;
    return (
      <Segment style={{height: '50%'}}inverted color='blue' secondary>
      <Rail internal position='right'>
      { <Message hidden={!this.state.successMessage} color='green' size='small'>{this.state.successMessage}</Message>}
      {errors.map(e =>
        <Message color='red' size='mini'> *{e.msg}</Message>
      )}
      </Rail>
      <Segment textAlign='center' raised  style={{left: '40%',width: '20%'}}>
        <Header> CREATE NEW USER</Header>
      </Segment>
      <Segment textAlign='center' style={style.segment} raised>
      <br/>
      <Form style={style.form} >
        <Form.Group widths='equal'>
           <Form.Field required>
             <label>First Name</label>
             <input placeholder='First Name' type='text' name='newFirst' value={this.state.fields.newFirst}  onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required>
             <label>Last Name</label>
             <input placeholder='Last Name' type='text' name='newLast' value={this.state.fields.newLast} onChange={this.handleInputChange}/>
           </Form.Field>
         </Form.Group>
         <Form.Group widths='equal'>
           <Form.Field required>
             <label>Email</label>
             <input placeholder='Email' type='email' name='newEmail' value={this.state.fields.newEmail} onChange={this.handleInputChange}/>

           </Form.Field>
           <Form.Field required>
             <label>Password</label>
             <input placeholder='Password' type='password' name='newPassword' value={this.state.fields.newPassword} onChange={this.handleInputChange}/>
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
        <br/>
        </Segment>
        </Segment>
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

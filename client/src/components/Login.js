import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Rail, Segment } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '', password: '', errors: [], redirect: false
    };
  }

  handleChange = (event) => {
    const target = event.target;
     const value = target.value;
     const name = target.name;
     this.setState({ [name]: value });
   }

  handleLogin = () => {
    fetch('/api/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json())
    .then((data) => {
      console.log('Data:', data);
      if (typeof data !== 'object') {
          if(data === 'home')this.setState({redirect:true});
      } else this.setState({errors: data.errors});
    })
  }

  render() {
    const {errors} = this.state;
    if(this.state.redirect) {
      return <Redirect to='/home'/>
    }
    return (
      <div className='login-form'>
          <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{ width: '40%' }}>
            <Segment raised>
              <Header as='h2' color='00BAB4' textAlign='center'>
               <Image style={{fontSize: '45px'}} src='/aviateLogo.png'/>
               <br/>
               <br/>
                {'TRACKSTER'}
              </Header>
              <Form style={{left: '15%', width: '70%', marginTop: '5%', marginBottom: '5%' }}>
                {this.state.errors && errors.map(e => <Message color='red' size='mini'> *{e.msg}</Message> )}
                <Form.Input icon='mail' iconPosition='left' name='email' placeholder='E-mail address' value={this.state.email} onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' placeholder='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                <br/>
                  <Button style={{marginLeft: '25%', width:'50%'}}color='blue' fluid size='large' onClick={this.handleLogin}> Log In</Button>
              </Form>
            </Segment>
            <Segment raised>
                Return to <a href='https://www.aviateinc.com/'>Aviate Inc.</a>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import main from './Main'

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.setState({
      res: stringifyFormData(data)
    })
    fetch('/api/users/login', {
      method: 'POST',
      body: data,
    })
  }

  render() {
    return (
      <div className='login-form'>
          <Grid
          textAlign='center'
          style={{ height: '100%'}}
          verticalAlign='middle'>

          <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={this.onSubmit} size='large'>
              <Segment raised>
              <Header as='h2' color='00BAB4' textAlign='center'>
               <Image src='/aviateLogo.png'/>
               <br/>
               <br/>
                {'AVIATE TRACKER'}
              </Header>
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  name='email'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                />
                <Link to='/main' >
                  <Button color='blue' fluid size='large'> Log In</Button>
                </Link>
              </Segment>
            </Form>
            <Message>
            Return to our website <a href='https://www.aviateinc.com/'>here</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;


function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}

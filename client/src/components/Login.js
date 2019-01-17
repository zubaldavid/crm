import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import main from './Main'

class Login extends Component {
  loginToMain() {
    main.openMain();
  }

  render() {
    return (
      <div className='login-form'>
          <Grid
          textAlign='center'
          style={{ height: '100%'}}
          verticalAlign='middle'>

          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
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
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                  <Button color='blue' fluid size='large' onClick={this.loginToMain}> Log In</Button>
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

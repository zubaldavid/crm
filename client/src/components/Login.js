import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {}
  hideLogin = () => this.setState({ visible: false })

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
                <Link to='/main'>
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

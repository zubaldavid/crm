import React, { Component } from 'react';
import Login from './Login';
import UsersModal from './Users'
import {
  Button,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'

class TopHeader extends React.Component {
  render() {
    const style = {
        div : {
        leftheight:'60%',
        width: '90%',
        display: 'inline-block',
        topMargin: '100px'
      }
    };
    return (
      <Grid.Row>
        <Segment>
        <div style={style.div}>
          <Header className='hederTitle' as='h3' style={{float:'left'}}>
              <Image src='/aviateLogo.png' size='small' />
              AVIATE ENTERPRISES, INC.
          </Header>
          <UsersModal/>
          <LogoutButton/>
          </div>
        </Segment>
      </Grid.Row>
    )
  }
}

class LogoutButton extends React.Component {
  constuctor(){}
  render() {
    return (
      <Button style={{float:'right'}}> Logout</Button>
    )
  }
}

export default TopHeader

import React, { Component } from 'react';
import Login from './Login';
import UsersModal from './users/Users'
import {
  Button,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'

class TopHeader extends Component {
  render() {
    const style = {
      div : { leftheight:'60%', width: '90%', display: 'inline-block', topMargin: '100px'},
      segment: {height: '65px'}
    };
    return (
        <Segment style={style.segment}>
        <div style={style.div}>
          <Header className='hederTitle' as='h3' style={{float:'left'}}>
              <Image src='/aviateLogo.png' size='small' />
              AVIATE ENTERPRISES, INC.
          </Header>
          <UsersModal/>
          <LogoutButton/>
          </div>
        </Segment>
    )
  }
}

function LogoutButton () {
    return (
      <Button style={{float:'right'}}> Logout</Button>
    )
}

export default TopHeader

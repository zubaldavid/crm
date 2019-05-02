import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersModal from './users/Users';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
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
          <Header className='hederTitle' as='h3' style={{float:'left', color: '#20376B'}}>
              <Image src='/aviateLogo.png' size='small' />
              AVIATE ENTERPRISES, INC.
          </Header>

          <Link to='home'> <Button style={{marginLeft: '5%'}}> <Icon name='home'/> Home</Button> </Link>
          <Link to='quotes'> <Button style={{marginLeft: '1%'}}> <Icon name='folder open'/> Contracts</Button></Link>
          <Button style={{marginLeft: '1%'}}> <Icon name='gofore'/> Grainger </Button>
          <Button style={{marginLeft: '1%'}}> <Icon name='database'/> BPA </Button>
          <Link to='finance'><Button style={{marginLeft: '1%'}}> <Icon name='dollar'/> Finance </Button></Link>
          <Link to='users'> <Button style={{marginLeft: '1%'}}> <Icon name='user'/> Users </Button> </Link>
          <Link to='/login'>
            <LogoutButton/>
          </Link>
          </div>
        </Segment>
    )
  }
}

function LogoutButton () {
    return (
      <Button style={{float:'right'}}> <Icon name='sign-out'/> Logout</Button>
    )
}

export default TopHeader

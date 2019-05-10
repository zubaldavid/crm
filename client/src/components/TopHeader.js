import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersModal from './users/Users';
import { createBrowserHistory } from 'history';
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react'

class TopHeader extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
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

          <Link to='home'> <Button style={{marginLeft: '5%'}}> <Icon name='home'/> Home </Button> </Link>
          <Link to='quotes'> <Button style={{marginLeft: '1%'}}> <Icon name='folder open'/> Contracts</Button></Link>
          <Link to='grainger'><Button style={{marginLeft: '1%'}}> <Icon name='gofore'/> Grainger </Button></Link>
          <Button style={{marginLeft: '1%'}}> <Icon name='database'/> BPA </Button>
          <Dropdown style={{marginLeft: '1%'}} text='Finance' icon='dollar' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to='finance-contracts'>Contract Payments </Link></Dropdown.Item>
              <Dropdown.Item><Link to='finance-grainger'>Grainger Payments</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{marginLeft: '1%'}} text='Admin' icon='user' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item><Link to='users'>Users </Link></Dropdown.Item>
              <Dropdown.Item>Logs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link to='/'>
            <LogoutButton/>
          </Link>
        </div>
        </Segment>
    )
  }
}

function LogoutButton () {
    return (
      <Button style={{float:'right'}}> <Icon name='sign-out'/> Logout </Button>
    )
}

export default TopHeader

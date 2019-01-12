import React, { Component } from 'react'
import TabBar from './TabBar'
import {
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

class SideBar extends Component {
  state = { visible: false }
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state
    return (
      <div  style={{ top:'10%', left:'2.5%', width: '95%', height: '88%', position:'absolute'}} >
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='uncover'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible='false'
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='' />
              Quotes
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='' />
              Grainger
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='dollar sign' />
              Finance
            </Menu.Item>

          </Sidebar>

          <Sidebar.Pusher >
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <br/>
              <TabBar />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SideBar

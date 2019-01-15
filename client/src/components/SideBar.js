import React, { Component } from 'react'
import TabBar from './TabBar'
import Dashboard from './HomeDashboard'
import NewQuoteModal from './NewQuoteModal'
import {
  Button,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

class SideBar extends React.Component {
  state = { visible: false }
  constructor(props) {
    super(props);

    this.state = {
      home: true,
      quotes: false,
      grainger: false,
      finance: false,
      header: 'Home',
      newQuote: false,
    };
  }
  openHome = () => {
    this.setState({
      home: true,
      quotes: false,
      grainger: false,
      finance: false,
      header: 'Home',
      newQuote: false
    });
  }
  openQuotes = () => {
    this.setState({
      home: false,
      quotes: true,
      grainger: false,
      finance: false,
      header: 'Quotes',
      newQuote: true
    });
  }
  openGrainger = () => {
    this.setState({
      home: false,
      quotes: false,
      grainger: true,
      finance: false,
      header: 'Grainger',
      newQuote: true
    });
  }
  openFinance = () => {
    this.setState({
      home: false,
      quotes: false,
      grainger: false,
      finance: true,
      header: 'Finance',
      newQuote: false
    });
  }

  render() {
    const { visible } = this.state
    return (
      <div  style={{ top:'10%', left:'1%', width: '98%', height: '88%', position:'absolute'}} >
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
            <Menu.Item as='a' onClick={this.openHome}>
              <Icon name='home'/>
              Home
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openQuotes}>
              <Icon name='folder'/>
              Quotes
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openGrainger}>
              <Icon name='folder' />
              Grainger
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openFinance}>
              <Icon name='dollar sign' />
              Finance
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher >
            <Segment basic>
              <Header as='h3' style={{alignItems:'center'}}>
                {this.state.header}
                { this.state.newQuote && <NewQuoteModal/>}
              </Header>

              { this.state.home && <Dashboard/> }
              { this.state.quotes && <TabBar/>  }
              { this.state.grainger && <TabBar/>}

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SideBar

import React, { Component } from 'react'
import QuoteTabBar from './quotes/QuoteTabBar'
import GraingerTabBar from './grainger/GraingerTabBar'
import Dashboard from './home/HomeDashboard'
import {
  Grid,
  Header,
  Icon,
  Input,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

class SideBar extends Component {
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
      serchBar: false,
    };
  }
  openHome = () => {
    this.setState({
      home: true,
      quotes: false,
      grainger: false,
      finance: false,
      header: 'Home',
      newQuote: false,
      serchBar: false,
    });
  }
  openQuotes = () => {
    this.setState({
      home: false,
      quotes: true,
      grainger: false,
      finance: false,
      header: 'Quotes',
      newQuote: true,
      serchBar: true,
    });
  }
  openGrainger = () => {
    this.setState({
      home: false,
      quotes: false,
      grainger: true,
      finance: false,
      header: 'Grainger',
      newQuote: true,
      serchBar: true,
    });
  }
  openBPA = () => {
    this.setState({
      home: false,
      quotes: false,
      grainger: false,
      finance: true,
      header: 'BPA',
      newQuote: false,
      serchBar: false,
    });
  }
  openFinance = () => {
    this.setState({
      home: false,
      quotes: false,
      grainger: false,
      finance: true,
      header: 'Finance',
      newQuote: false,
      serchBar: false,
    });
  }

  render() {
    const { visible } = this.state
    const style = {
      div : { top:'.01em', left:'.5%', width: '99%', height: '61em', position:'relative'},
      gridCol: {width: '90%'},
    }
    
    return (
      <div  style={style.div} >
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            inverted
            vertical
            visible='false'
            width='thin'
          >
            <Menu.Item as='a' onClick={this.openHome}>
              <Icon name='home'/>
              Home
            </Menu.Item>
            <Menu.Item as='a' color='red' onClick={this.openQuotes}>
              <Icon name='quora'/>
              Quotes
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openGrainger}>
              <Icon name='gofore' />
              Grainger
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openBPA}>
              <Icon name='database' />
              BPA
            </Menu.Item>
            <Menu.Item as='a' onClick={this.openFinance}>
              <Icon name='dollar sign' />
              Finance
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher >
            <Segment basic>
              <Grid.Column style={style.gridCol}>

              </Grid.Column>
              { this.state.home && <Dashboard/> }
              { this.state.quotes && <QuoteTabBar header='Quotes'/>  }
              { this.state.grainger && <GraingerTabBar/>}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

class SearchBar extends Component {
  render () {
    const style = {
      search : { left: '2%', float:'right'}
    }
    return (
       <Input style={style.search} icon='search' placeholder='Search...' />
    )}
}

export default SideBar

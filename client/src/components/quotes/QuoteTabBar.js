import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AwardsBidsTable from './AwardsBidsTable';
import BilledBidsTable from './BilledBidsTable';
import CompletedBidsTable from './CompletedBidsTable';
import OpenBidsTable from './OpenBidsTable';
import SourcesSoughtTable from './SourcesSoughtTable';
import DeadBidsTable from './DeadBidsTable';
import {
  Button,
  Input,
  Label,
  Menu,
  Tab,
  Select
} from 'semantic-ui-react'

const colors = [
  'blue',
  'orange',
  'red',
  'green',
  'purple',
  'grey',
]

// Stores open awards in tab
class CountFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  getCount () {
    fetch('/api/quote/awarded_bids/count')
   .then(res => res.json())
   .then(data => {
     let newCount = data[0].count;
     this.setState({count: newCount});
   });
  }

  componentDidMount () {
    this.getCount();
  }

  render () {
    const {count} = this.state;
    return (
        <Label>{count}</Label>
    )
  }
}

const searchOptions = [
  { key: 'page', text: 'All Bids', value: 'all' },
  { key: 'page', text: 'Invoice', value: 'invoice' },
  { key: 'org', text: 'Quote', value: 'quote' },
  { key: 'site', text: 'PO Number', value: 'poNumber' },
  { key: 'site', text: 'Solicitation', value: 'soliciation' },
]

function searchBar () {
  return (
    <Menu.Item disabled position='right'>
      <Input type='text' placeholder='Search...' action>
        <input />
        <Select compact options={searchOptions} defaultValue='all' />
        <Button type='submit'>Search</Button>
      </Input>
    </Menu.Item>
  )
}

const panes = [
  { menuItem: { key: 'open', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
      render: () =>
        <Tab.Pane attached={true}>
          <OpenBidsTable/>
        </Tab.Pane>
  },
  { menuItem: (
        <Menu.Item key='messages'>
          Awards <CountFunction/>
        </Menu.Item>
    ),
    render: () =>
      <Tab.Pane attached={false}>
        <AwardsBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'billed', icon: 'folder open', content: 'Billed'},
      render: () =>
      <Tab.Pane attached={false}>
          <BilledBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'completed', icon: 'folder',  content: 'Completed'},
      render: () =>
      <Tab.Pane attached={false}>
        <CompletedBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'sources sought', icon: 'speakap', content: 'Sources Sought'},
      render: () =>
      <Tab.Pane attached={false}>
          <SourcesSoughtTable/>
      </Tab.Pane>
  },
  { menuItem: { key: 'dead', icon: 'delete', content: 'Dead',},
      render: () =>
      <Tab.Pane attached={false}>
          <DeadBidsTable/>
      </Tab.Pane>
  },
  { menuItem: (
    searchBar()
  ),
  },
]

class QuoteTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      color: colors[0],
    };
  }

  handleTabChange = (e, { activeIndex }) => this.setState({color: colors[activeIndex]});

  render() {
    const {color, activeIndex} = this.state;
    const style = {
      panes : { width: '92%'},
    }
    return (
      <div>
        <Tab
          onTabChange={this.handleTabChange}
          style={style.panes}
          menu={{color, inverted:true, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    )
  }
}

export default QuoteTabBar;

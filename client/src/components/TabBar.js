import React, { Component } from 'react';
import OpenBidsTable from './quotes/OpenBidsTable';
import WonBidsTable from './quotes/WonBidsTable';
import BilledBidsTable from './quotes/BilledBidsTable';
import CompletedBidsTable from './quotes/CompletedBidsTable';
import DeadBidsTable from './quotes/DeadBidsTable';
import {
  Button,
  Tab
} from 'semantic-ui-react'

const colors = [
  'blue',
  'orange',
  'red',
  'green',
  'grey'
]

const panes = [
  { menuItem: { key: 'open', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
      render: () =>
        <Tab.Pane attached={true}>
          <OpenBidsTable/>
        </Tab.Pane>
  },
  { menuItem: { key: 'won', icon: 'folder outline', content: 'Won', },
      render: () =>
      <Tab.Pane attached={false}>
        <WonBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'billed', icon: 'folder open', content: 'Billed', },
      render: () =>
      <Tab.Pane attached={false}>
          <BilledBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'completed', icon: 'folder',  content: 'Completed', color: 'green'},
      render: () =>
      <Tab.Pane attached={false}>
        <CompletedBidsTable/>
      </Tab.Pane>
    },
  { menuItem: { key: 'dead', icon: 'delete', content: 'Dead', color:'grey'},
      render: () =>
      <Tab.Pane attached={false}>
          <DeadBidsTable/>
      </Tab.Pane>
  },
]

class TabBar extends Component {
  state = {activeIndex: 0, color: colors[0]};
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
          menu={{ color, inverted:true, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    )
  }
}

export default TabBar

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenBidsTable from './OpenBidsTable';
import BilledBidsTable from './BilledBidsTable';
import AwardsBidsTable from './AwardsBidsTable';
import CompletedBidsTable from './CompletedBidsTable';
import DeadBidsTable from './DeadBidsTable';
import {
  Button,
  Input,
  Label,
  Menu,
  Tab
} from 'semantic-ui-react'

const colors = [
  'blue',
  'orange',
  'red',
  'green',
  'purple',
  'grey',
]

const panes = [
  { menuItem: { key: 'open', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
      render: () =>
        <Tab.Pane attached={true}>
          <OpenBidsTable/>
        </Tab.Pane>
  },
  { menuItem: { key: 'awards', icon: 'folder outline', content: 'Awards'},
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

      </Tab.Pane>
  },
  { menuItem: { key: 'dead', icon: 'delete', content: 'Dead',},
      render: () =>
      <Tab.Pane attached={false}>
          <DeadBidsTable/>
      </Tab.Pane>
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
          menu={{ color, inverted:true, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    )
  }
}

export default QuoteTabBar;

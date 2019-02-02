import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Tab
} from 'semantic-ui-react'

const colors = [
  'blue',
  'orange',
  'red',
  'green',
  'purple',
  'grey'
]

const panes = [
  { menuItem: { key: 'open', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
      render: () =>
        <Tab.Pane attached={true}>

        </Tab.Pane>
  },
  { menuItem: { key: 'awards', icon: 'folder outline', content: 'Awards'},
      render: () =>
      <Tab.Pane attached={false}>

      </Tab.Pane>
    },
  { menuItem: { key: 'billed', icon: 'folder open', content: 'Billed'},
      render: () =>
      <Tab.Pane attached={false}>

      </Tab.Pane>
    },
  { menuItem: { key: 'completed', icon: 'folder',  content: 'Completed'},
      render: () =>
      <Tab.Pane attached={false}>

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

      </Tab.Pane>
  },

]

class GraingerTabBar extends Component {
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

export default GraingerTabBar;

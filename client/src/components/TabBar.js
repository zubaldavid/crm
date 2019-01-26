import React, { Component } from 'react'
import OpenBidsTable from './quotes/OpenBidsTable'
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
  { menuItem: { key: 'users', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
      render: () =>
        <Tab.Pane attached={true}>
          <OpenBidsTable/>
        </Tab.Pane>
  },
  { menuItem: { key: 'won', icon: 'folder outline', content: 'Won', color: 'orange'},
      render: () =>
      <Tab.Pane attached={false}>
      </Tab.Pane>
    },
  { menuItem: { key: 'billed', icon: 'folder open', color: 'red', content: 'Billed'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 3 Content
      </Tab.Pane>
    },
  { menuItem: { key: 'completed', icon: 'folder',  color: 'green', content: 'Completed'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 3 Content
      </Tab.Pane>
    },
  { menuItem: { key: 'dead', icon: 'delete',  color: 'grey', content: 'Dead'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 3 Content
      </Tab.Pane>
  },
]

class TabBar extends Component {
  state = {color: colors[0]};
  handleColorChange = (e) => {
    this.setState({color: e.target.value});
  }

  render() {
    const {color} = this.state;
    const style = {
      panes : { width: '92%'},
    }
    return (
      <div>
        <Tab
          onClick={this.props.handleColorChange}
          style={style.panes}
          menu={{ inverted:true, color, borderless: true, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    )
  }
}

export default TabBar

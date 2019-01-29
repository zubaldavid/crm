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
  { menuItem: { key: 'billed', icon: 'folder open', content: 'Billed', color: 'red'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 3 Content
      </Tab.Pane>
    },
  { menuItem: { key: 'completed', icon: 'folder',  content: 'Completed', color: 'green'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 4 Content
      </Tab.Pane>
    },
  { menuItem: { key: 'dead', icon: 'delete', content: 'Dead', color:'grey'},
      render: () =>
      <Tab.Pane attached={false}>
        Tab 5 Content
      </Tab.Pane>
  },
]

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {color: colors[0]};
  }
    handleColorChange = (e) => {this.setState({color: e.target.value});
  }

  //if(panes.menu.key = )
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

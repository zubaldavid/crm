import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Users from './Users'

class TabBar extends Component {
  render() {
    const panes = [
      { menuItem: { key: 'users', icon: 'folder open outline', content: 'Open Bids', color: 'blue'},
          render: () =>
            <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
        },
      { menuItem: { key: 'won', icon: 'folder outline', content: 'Won', color: 'orange'},
          render: () =>
          <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
        },
      { menuItem: { key: 'billed', icon: 'folder open', color: 'red', content: 'Billed'},
          render: () =>
          <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
        },
      { menuItem: { key: 'completed', icon: 'folder',  color: 'green', content: 'Completed'},
          render: () =>
          <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
        },
    ]

    return <Tab menu={{ borderless: true, attached: false, tabular: false }} panes={panes} />
  }
}

export default TabBar

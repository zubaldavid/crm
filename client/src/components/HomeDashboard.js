import React, { Component } from 'react';
import {
  Card,
  Header
} from 'semantic-ui-react'

class Dashboard extends Component {
  render() {
    const items = [
      {
        header: 'Project Report - April',
        description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        meta: 'ROI: 30%',
      },
      {
        header: 'Project Report - May',
        description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
        meta: 'ROI: 34%',
      },
      {
        header: 'Project Report - June',
        description:
          'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
        meta: 'ROI: 27%',
      },
      {
        header: 'Project Report - June',
        description:
          'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
        meta: 'ROI: 27%',
      },
    ]

    const style = {
      panes : {
        width: '92%'
      }
    }

    return (
        <div >
          <Header>Quotes</Header>
          <Card.Group items={items} />
          <Header>Grainger</Header>
          <Card.Group items={items} />
        </div>
    )
  }
}

export default Dashboard

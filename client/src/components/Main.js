import React, { Component } from 'react'
import SideBar from './SideBar'
import Login from './Login'
import TopHeader from './TopHeader'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      showDashboard: true,
    };
  }

  openMain() {
    this.setState({
      showLogin: false,
      showDashboard: true,
    });
  }

  render() {
    return (
        <div>
          {this.state.showDashboard && <Dashboard/>}
        </div>
    )
  }
}

function Dashboard(props) {
  return(
    <div>
      <TopHeader />
      <SideBar />
    </div>
  )
}

export default Main

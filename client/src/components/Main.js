import React, { Component } from 'react'
import SideBar from './SideBar'
import Login from './Login'
import TopHeader from './TopHeader'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: true};
  }

  handleLoginClick () {
      this.setState({isLoggedIn: true})
  }

  handleLogoutClick () {
      this.setState({isLoggedIn: false})
  }
render() {
  const isLoggedIn = this.state.isLoggedIn;
  let view;

  if (isLoggedIn) {
    view  =  <Dashboard onClick={this.handleLogoutClick}/>;
  } else { view = <Login onClick={this.handleLoginClick}/>; }

    return (
        <div>{view}</div>
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

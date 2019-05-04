import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './Login';
import Main from './Main';
import Users from './users/Users'
import TopHeader from './TopHeader'
import QuoteTabBar from './quotes/QuoteTabBar'
import NewQuoteForm from './quotes/forms/NewQuoteForm'
import Dashboard from './home/HomeDashboard'
import UsersTable from './users/UsersTable'
import AddNewUser from './users/AddNewUser'
import ResetUser from './users/ResetUser'
import AllPaymentsTable from './finance/AllPaymentsTable'
import HOC from './AutoLogout';


const auth = {
  isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100);
    },
    signOut (cb) {
      this.isAuthenticated = false
      setTimeout(cb,100);
    }
}

const PrivateRoute = ({ component : Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
    ? <Component {...props}/>
    : <Redirect to='/login'/>
  )}/>
)

const App = () => (
  <Router>
      <div className = "container">
        <Route exact path="/login" component= {Login}/>
        <Route path="/" component= {TopHeader}/>
        <Route path="/main" component={Main}/>
        <Route path="/home" component={Dashboard}/>
        <Route exact path="/quotes" component={QuoteTabBar}/>
        <Route path="/users" component={UsersTable}/>
        <Route path="/create-user" component={AddNewUser}/>
        <Route path="/reset-user" component={ResetUser}/>
        <Route path="/create-quote" component={NewQuoteForm}/>
        <PrivateRoute path="/finance" component={AllPaymentsTable}/>
      </div>
  </Router>
);

export default App

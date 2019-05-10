import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Login from './Login';
import Users from './users/Users'
import QuoteTabBar from './quotes/QuoteTabBar'
import NewQuoteForm from './quotes/forms/NewQuoteForm'
import Dashboard from './HomeDashboard'
import UsersTable from './users/UsersTable'
import AddNewUser from './users/AddNewUser'
import ResetUser from './users/ResetUser'
import GraingerTabBar from './grainger/GraingerTabBar'
import AllPaymentsTable from './finance/AllPaymentsTable'
import GraingerPaymentsTable from './finance/GraingerPaymentsTable'
import HOC from './AutoLogout'; // logs user out after 15 minutes  TODO: not fully functional - find out why

// This was a test fake auth
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
        <Route exact path="/" component= {Login}/>
        <Route path="/home" component={Dashboard} />
        <Route exact path="/quotes" component={QuoteTabBar}/>

        <Route path="/users" component={UsersTable} >
        <Route path="/create-user" component={AddNewUser}/>
        <Route path="/reset-user" component={ResetUser}/>
        <Route path="/edit-user" component={AddNewUser}/>
        </Route>
        <Route path="/grainger" component={GraingerTabBar}/>
        <Route path="/create-quote" component={NewQuoteForm}/>
        <Route path="/finance-contracts" component={AllPaymentsTable}/>
        <Route path="/finance-grainger" component={GraingerPaymentsTable}/>
      </div>
  </Router>
);

export default App

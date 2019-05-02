import React from 'react';
import {
  BrowserRouter,
  Route
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

const App = () => (
  <BrowserRouter>
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
        <Route path="/finance" component={AllPaymentsTable}/>
      </div>
  </BrowserRouter>
);

export default App

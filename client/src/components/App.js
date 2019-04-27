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

const App = () => (
  <BrowserRouter>
      <div className = "container">
        <TopHeader/>
        <Route exact path="/login" component= {Login}/>
        <Route exact path="/" component= {Dashboard}/>
        <Route path="/main" component={Main}/>
        <Route path="/home" component={Dashboard}/>
        <Route path="/quotes" component={QuoteTabBar}/>
        <Route path="/users" component={UsersTable}/>
        <Route path="/create-user" component={AddNewUser}/>
        <Route path="/create-quote" component={NewQuoteForm}/>
      </div>
  </BrowserRouter>
);

export default App

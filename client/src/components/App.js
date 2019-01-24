import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import Login from './Login';
import Main from './Main';
import Users from './users/Users'

const App = () => (
  <BrowserRouter>
      <div className = "container">
        <Route path="/" component= {Main}/>
        <Route path="/users" component={Users}/>
      </div>
  </BrowserRouter>
);

export default App

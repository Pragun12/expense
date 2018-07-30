import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Expense from './components/Expense';
import { Switch,BrowserRouter, Route } from 'react-router-dom';
import setAuthorizationToken from './utils/setAuthorizationToken';


import './App.css';
import setCurrentUser from './utils/setCurrentUser';

class App extends Component {
  componentWillMount(){

   if(localStorage.getItem('jwtToken')){
      setAuthorizationToken( localStorage.getItem('jwtToken'));
     
   }

  }

  render() {

    let isLoggedIn=setCurrentUser(localStorage.getItem('jwtToken')).isLoggedIn;
    const renderLoggedin=(
      <Switch>
      <Route exact path="/" component={Login }/>
      <Route path="/register" component={Register}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/expense" component={Expense}/>
      </Switch>
    );

    const renderLoggedout=(
      <Switch>
      <Route exact path="/" component={Login }/>
      <Route path="/register" component={Register}/>
      <Route path="/dashboard" component={Login}/>
      <Route path="/expense" component={Login}/>
      </Switch>

    );

    return (
      <div className="App">
        
        <BrowserRouter>
       {isLoggedIn?renderLoggedin:renderLoggedout}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

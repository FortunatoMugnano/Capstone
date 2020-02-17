import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import NavBar from './components/Nav/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { getUser, removeUser } from './API/userManager';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationView from './components/ApplicationView';

class App extends Component {
  state = {
    user: getUser(),
    
  }

  logout = () => {
    this.setState({ user: null });
    removeUser();
  }

  render() {
  
    return (
      <div className="App">
          
          <Router>
          <Route exact path="/login" render={() => (
            <Login onLogin={(user) => this.setState({ user })} />
          )} />
          <Route exact path="/register" render={() =>  (
            <Register onLogin={(user) => this.setState({ user })} />
          )} />
             
             <Route path="/" render={() => {
            return this.state.user ? (
              <>
              
              <NavBar user={this.state.user} logout={this.logout} {...this.props} />
              <ApplicationView {...this.props} user={this.state.user} />
              
            </>
            ) : <Redirect to="/login" />
          }} />
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/Nav/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import JobDetails from './components/Job/JobDetails';
import FormJob from './components/Job/FormJob';
import EditJobForm from './components/Job/EditJobForm';
import CompanyList from './components/Company/CompanyList';
import AddCompanyForm from './components/Company/AddCompanyForm';
import { getUser, removeUser } from './API/userManager';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
          <NavBar user={this.state.user} logout={this.logout} {...this.props}/>
          <Route exact path="/login" render={() => (
            <Login onLogin={(user) => this.setState({ user })} />
          )} />
          <Route exact path="/register" render={() =>  (
            <Register onLogin={(user) => this.setState({ user })} />
          )} />
          <Route exact path="/jobs/:jobId(\d+)" render={(props) => {
                return <JobDetails jobId={parseInt(props.match.params.jobId)} {...this.props} {...props} />
            }} />
          <Route exact path="/jobs/new" render={(props) => {
                    return <FormJob {...props} />
                }} />
          <Route exact path="/jobs/:jobId(\d+)/edit" render={props => {
              return <EditJobForm {...props} />
          }} />
           <Route exact path="/companies" render={(props) => {
                return <CompanyList {...this.props} {...props} />
            }} />
          <Route exact path="/companies/new" render={(props) => {
                    return <AddCompanyForm {...props} />
                }} />
          <Route exact path="/" render={() => {
            return this.state.user ? (
              <>
              <Home {...this.props} />
              
            </>
            ) : <Redirect to="/login" />
          }} />
        </Router>
      </div>
    );
  }
}

export default App;

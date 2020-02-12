import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import JobDetails from './Job/JobDetails';
import Home from './Home';
import FormJob from './Job/FormJob';
import EditJobForm from './Job/EditJobForm';
import CompanyList from './Company/CompanyList';
import AddCompanyForm from './Company/AddCompanyForm';
import EditCompany from './Company/EditCompany';
import CommentList from './Comment/CommentList';
import AddComment from './Comment/AddComment'
import EditComment from './Comment/EditComment';
import CompanyCommentList from './Company/CompanyCommentList';
import {CardFooter} from 'reactstrap';
import '../App.css';

class ApplicationViews extends Component {

    render() {
        return (
            <>
               
               <Route exact path="/" render={(props) => {
                 return <Home {...this.props} />
               }} />
              
                <Route exact path="/jobs/:jobId(\d+)" render={(props) => {
                return <JobDetails jobId={parseInt(props.match.params.jobId)} {...this.props} {...props} />
               }} />
              <Route exact path="/jobs/new" logout={this.logout} render={(props) => {
                    return <FormJob {...props}  />
                }} />
               <Route exact path="/jobs/:jobId(\d+)/edit" render={props => {
              return <EditJobForm {...props} />
               }} />
                <Route exact path="/companies/:companyId(\d+)/edit" render={props => {
              return <EditCompany companyId={parseInt(props.match.params.companyId)} {...this.props} {...props} />
               }} />
              <Route exact path="/companies" render={(props) => {
                return <CompanyList {...this.props} {...props} user={this.props.user} />
              }} />
              <Route exact path="/companies/new" render={(props) => {
                return <AddCompanyForm {...this.props} {...props} />
              }} />
              <Route exact path="/comments" render={(props) => {
                return <CommentList {...this.props} {...props} user={this.props.user} />
              }} />
               <Route exact path="/comments/new" render={(props) => {
                return <AddComment {...this.props} {...props} />
              }} />
               <Route exact path="/comments/:commentId(\d+)/edit" render={props => {
              return <EditComment commentId={parseInt(props.match.params.commentId)} {...this.props} {...props} />
               }} />
                <Route exact path="/companies/:companyId(\d+)/comments" render={props => {
              return <CompanyCommentList companyId={parseInt(props.match.params.companyId)} {...this.props} {...props} user={this.props.user} />
               }} />
                
              
            </>

        )
    }
}

export default withRouter(ApplicationViews)
import React, { Component } from 'react';
import JobManager from '../../API/JobManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';



class JobDetails extends Component {

    state = {
        title: "",
        description: "",
        loadingStatus: true,
        salary: "",
        jobPostUrl: "",
        date: "",
        companyName: "",
        jobStatus: "",
        Id: ""
    }

    handleDelete = () => {
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true })
        JobManager.delete(this.props.jobId, authHeader)
            .then(() => this.props.history.push("/"))
    }

    componentDidMount() {
        const authHeader = createAuthHeaders();
        JobManager.getSingleJob(this.props.jobId, authHeader)
            .then((job) => {
                this.setState({
                    title: job.title,
                    description: job.description,
                    salary: job.salary,
                    loadingStatus: false,
                    jobPostUrl: job.jobPostUrl,
                    date: job.date,
                    companyName: job.company.name,
                    jobStatus: job.jobStatus.status,
                    Id: this.props.jobId

                });
            });
    }

    render() {

        if (this.state.loadingStatus)
         { return <p>Loading.. </p> }
        return (
            <div className="card">
                <div className="card-content">
                    <h3>Title: <span>{this.state.title}</span></h3>
                    <h3>Description: {this.state.description}</h3>
                    <h2>Salary : {this.state.salary}</h2>
                    <h2>Url: {this.state.jobPostUrl}</h2>
                    <h2>Company Name : {this.state.companyName}</h2>
                    <h2>Status : {this.state.jobStatus}</h2>
                    <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</button>
                    <Link to={`/jobs/${this.state.Id}/edit`}><button>Edit</button></Link>
                </div>
            </div>
        );
    }
}

export default JobDetails;
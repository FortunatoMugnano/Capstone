import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom';

class JobCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h3> <span className="card-jobname">{this.props.job.title}</span></h3>
                    <p>{this.props.job.description}</p>
                    <p>{this.props.job.company.name}</p>
                    <p>{this.props.job.jobStatus.status}</p>
                    <Link to={`/jobs/${this.props.job.id}`}><button>Details</button></Link>
                </div>
            </div>
        );
    }
}

export default withRouter(JobCard);
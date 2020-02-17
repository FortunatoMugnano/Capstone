import React, { Component } from 'react';
import JobManager from '../../API/JobManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap'
import { Button } from 'reactstrap';




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

        return (

            <Card bg="light" style={{ width: '90%', alignSelf: 'center'}}>
                <Card.Header><h3><span>{this.state.title}</span></h3></Card.Header>
                    <Card.Body style={{ backgroundColor: '#9CADCE'}}>
                        <Card.Title>
                        <h3>Description:
                             <p>{this.state.description}</p>
                        </h3>
                        </Card.Title>
                        <Card.Text>
                        <h2>Salary :
                            <p>{this.state.salary}</p>
                        </h2>
                        <h2>Url: 
                            <p>{this.state.jobPostUrl}</p>
                        </h2>
                        <h2>Company Name: 
                            <p>{this.state.companyName}</p>
                        </h2>
                        <h2>Status:
                            <p>{this.state.jobStatus}</p>
                        </h2>
                        </Card.Text>
                        <Link> <Button color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button></Link>
                        <Link to={`/jobs/${this.state.Id}/edit`}><Button color="info">Edit</Button></Link>
                    </Card.Body>
                  
             </Card>
                    
        );
    }
}

export default JobDetails;
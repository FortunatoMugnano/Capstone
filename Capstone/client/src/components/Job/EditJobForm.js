import React, { Component } from "react"
import JobManager from '../../API/JobManager'
import CompanyManager from "../../API/CompanyManager"
import { createAuthHeaders } from '../../API/userManager';
import JobStatusManager from "../../API/JobStatusManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditJobForm extends Component {
    state = {
        id: "",
        title: "",
        description: "",
        salary: "",
        loadingStatus: false,
        jobPostUrl: "",
        companies: [],
        companyId: "",
        jobStatusId: "",
        jobStatuses: [],
        date: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleNumberFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = +evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingJob = evt => {
        evt.preventDefault()
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true });
        const editedJob = {
            id: +this.props.match.params.jobId,
            title: this.state.title,
            description: this.state.description,
            salary: this.state.salary,
            jobPostUrl: this.state.jobPostUrl,
            companyId: this.state.companyId,
            jobStatusId: this.state.jobStatusId,
            date: new Date()
        };

        JobManager.update(editedJob, authHeader)
            .then(() => this.props.history.push("/"))
    }

    getJobStatuses() {
        const authHeader = createAuthHeaders();
        return JobStatusManager.getJobStatus(authHeader)
    }

    componentDidMount() {
        const authHeader = createAuthHeaders();
        this.getJobStatuses().then(jobStatuses => {
            CompanyManager.getCompanies(authHeader)
            .then(allCompanies => {
                JobManager.getSingleJob(this.props.match.params.jobId, authHeader)
                    .then(job => {
                        this.setState({
                            id: job.id,
                            title: job.title,
                            description: job.description,
                            salary: job.salary,
                            jobPostUrl: job.jobPostUrl,
                            companyId: job.companyId,
                            companies: allCompanies,
                            loadingStatus: false,
                            jobStatusId: job.jobStatudId,
                            jobStatuses: jobStatuses,
                            date: job.date
                        })
                    })
            })
        })
        
    }

    render() {
        return (
            <>
            <h3>Edit this DreamJob</h3>
                <Form>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="title"
                                value={this.state.title}
                            />
                            
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="description"
                                value={this.state.description}
                            />
                           <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="number"
                                required
                                className="form-control"
                                onChange={this.handleNumberFieldChange}
                                id="salary"
                                value={this.state.salary}
                            />
                           <Label htmlFor="description">Url</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="jobPostUrl"
                                value={this.state.jobPostUrl}
                            />
                            <Label htmlFor="companyId">Company</Label>
                            <Input type="select"
                                className="form-control"
                                id="companyId"
                                value={this.state.companyId}
                                onChange={this.handleNumberFieldChange}
                            >
                                {this.state.companies.map(company =>
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                )}
                            </Input>
                            <br/>
                            <Input type="select"
                                className="form-control"
                                id="jobStatusId"
                                value={this.state.jobStatusId}
                                onChange={this.handleNumberFieldChange}
                            >
                                 <option value="">Select a Status</option>
                                {this.state.jobStatuses.map(status =>
                                    <option key={status.id} value={status.id}>
                                        {status.status}
                                    </option>
                                )}
                            </Input>
                           
                        
                        <div className="alignRight">
                            <Button
                                color="success" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingJob}
                                className="btn btn-primary"
                            >Update</Button>
                        </div>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

export default EditJobForm
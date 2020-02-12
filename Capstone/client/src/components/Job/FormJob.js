import React, { Component } from 'react';
import JobManager from '../../API/JobManager';
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';




class FormJob extends Component {
    state = {
        title: "",
        description: "",
        salary: 0,
        loadingStatus: false,
        jobPostUrl: "",
        companies: [],
        jobStatusId: 1,
        

    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleNumberFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = +evt.target.value;
        this.setState(stateToChange);
    };

    componentDidMount() {
        const authHeader = createAuthHeaders();
        CompanyManager.getCompanies(authHeader)
            .then((allCompanies) => {
                this.setState({
                    companies: allCompanies
                }
                )
            })
    };

    
    constructNewJob = evt => {
        evt.preventDefault();
        const authHeader = createAuthHeaders();
        const job = {
            title: this.state.title,
            description: this.state.description,
            salary: this.state.salary,
            jobPostUrl: this.state.jobPostUrl,
            companyId: parseInt(this.state.companyId),
            jobStatusId: this.state.jobStatusId
        };
        JobManager.post(job, authHeader)
            .then(() => this.props.history.push("/"))


        
    };

    render() {


        return (
            <>
            <h3>Add a new Dream Job</h3>
                <Form>
                    <FormGroup>
                        <Label htmlFor="title">Title </Label>
                            <Input type="text" required onChange={this.handleFieldChange} id="title" placeholder="Title" />
                            <Label htmlFor="description">Description </Label>
                            <Input type="text" required onChange={this.handleFieldChange} id="description" placeholder="Description" />
                            <Label htmlFor="salary">Salary </Label>
                            <Input type="number" required onChange={this.handleNumberFieldChange} value={this.state.salary} id="salary" placeholder="Salary" />
                            <Label htmlFor="jobPostUrl">Url </Label>
                            <Input type="text" required onChange={this.handleFieldChange} id="jobPostUrl" placeholder="Url" />
                            <Label htmlFor="companyId">Company </Label>
                            <Input type="select" 
                                className="form-control"
                                id="companyId"
                                value={this.state.companyId}
                                onChange={this.handleNumberFieldChange}
                            >
                                <option value="">Please select company</option>
                                {this.state.companies.map(company =>
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                )}
                            </Input>
                        </FormGroup>
                        <div className="alignRight" style={{marginTop: '5px'}}>
                            <Button color="primary" disabled={this.state.loadingStatus} onClick={this.constructNewJob}>Add a Job
                            </Button>
                        </div>
                   
                </Form>

                <h5 style={{margin: '6px'}}>Don't see the company?</h5>
                <Link to={`/companies/new`}><Button color="info">Add a Company</Button></Link>
            </>
        )
    }
}

export default FormJob;
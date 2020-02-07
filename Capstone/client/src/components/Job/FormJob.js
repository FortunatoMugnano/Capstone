import React, { Component } from 'react';
import JobManager from '../../API/JobManager';
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';




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
                <form>
                    <fieldset>
                        <div className="formgrid">
                        <label htmlFor="title">Title </label>
                            <input type="text" required onChange={this.handleFieldChange} id="title" placeholder="Title" />
                            <label htmlFor="description">Description </label>
                            <input type="text" required onChange={this.handleFieldChange} id="description" placeholder="Description" />
                            <label htmlFor="salary">Salary </label>
                            <input type="number" required onChange={this.handleNumberFieldChange} value={this.state.salary} id="salary" placeholder="Salary" />
                            <label htmlFor="jobPostUrl">Url </label>
                            <input type="text" required onChange={this.handleFieldChange} id="jobPostUrl" placeholder="Url" />
                            <label htmlFor="companyId">Company </label>
                            <select
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
                            </select>
                        </div>
                        <div className="alignRight">
                            <button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewJob}>Add a Job
                            </button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default FormJob;
import React, { Component } from 'react';
import CompanyManager from '../../API/CompanyManager';
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';





class AddComment extends Component {
    state = {
        text : "",
        companies: [],
        loadingStatus: false,
        companyId: ""

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
            .then((companies) => {
                this.setState({
                    companies: companies
                }
                )
            })
    };

    
    constructNewComment = evt => {
        evt.preventDefault();
        const authHeader = createAuthHeaders();
        const comment = {
            text: this.state.text,
            companyId:  parseInt(this.state.companyId),
            
        };
        commentManager.post(comment, authHeader)
            .then(() => this.props.history.push("/companies"))


        
    };

    render() {


        return (
            <>
                
                    
                        
                        <label htmlFor="name">Text </label>
                            <input type="textbox" required onChange={this.handleFieldChange} id="text" placeholder="Text" />
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
                        <div className="alignRight">
                            <button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewComment}>Add a Comment
                            </button>
                        </div>
                    
                
            </>
        )
    }
}

export default AddComment;
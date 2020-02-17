import React, { Component } from 'react';
import CompanyManager from '../../API/CompanyManager';
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';
import { Button, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';





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
                
                    
                        <h3>Add a new Comment</h3>
                        <Label htmlFor="name">Text </Label>
                            <Input type="textarea"  
                             required onChange={this.handleFieldChange} 
                             id="text" placeholder="Comment Here"
                            style={{marginBottom: '10px', width: '50%', alignSelf: "center"}} />
                            <Input type="select"
                                style={{width: '50%', alignSelf: "center"}}
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
                        <div className="alignRight">
                           <Link><Button color="primary" disabled={this.state.loadingStatus} onClick={this.constructNewComment} style={{marginTop: '5px'}}>Add a Comment
                            </Button></Link> 
                        </div>
                    
                
            </>
        )
    }
}

export default AddComment;
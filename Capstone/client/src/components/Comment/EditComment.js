import React, { Component } from "react"
import commentManager from '../../API/commentManager'
import CompanyManager from "../../API/CompanyManager"
import { createAuthHeaders } from '../../API/userManager';


class EditComment extends Component {
    state = {
        id: "",
        text: "",
        loadingStatus: false,
        companies: [],
        companyId: ""
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

    updateExistingComment = evt => {
        evt.preventDefault()
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true });
        const editedComment = {
            id: +this.props.match.params.commentId,
            text: this.state.text,
            companyId: this.state.companyId
        };

        commentManager.update(editedComment, authHeader)
            .then(() => this.props.history.push("/companies"))
    }

  

    componentDidMount() {
        const authHeader = createAuthHeaders();
            CompanyManager.getCompanies(authHeader)
            .then(allCompanies => {
                commentManager.getSingleComment(this.props.match.params.commentId, authHeader)
                    .then(comment => {
                        this.setState({
                            id: comment.id,
                            text: comment.text,
                            companyId: comment.companyId,
                            companies: allCompanies,
                            loadingStatus: false
                        })
                    })
            })
        
        
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                        <label htmlFor="titexttle">Text</label>
                            <input
                                type="textbox"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="text"
                                value={this.state.text}
                            />
                            <label htmlFor="companyId">Company</label>
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
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingComment}
                                className="btn btn-primary"
                            >Update</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditComment
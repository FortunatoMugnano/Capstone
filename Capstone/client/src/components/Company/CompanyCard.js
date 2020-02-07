import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom';
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';

class CompanyCard extends Component {
    state = {
        loadingStatus: false,
        companies: []
    }

    handleDelete = () => {
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true })
        CompanyManager.delete(this.props.company.id, authHeader)
            .then(() => this.props.history.push("/"))
    }


    
    render() {
        console.log("props", this.props)
        return (
            <div className="card">
                <div className="card-content">
                    <h3> <span className="card-companyName">{this.props.company.name}</span></h3>
                    <p>{this.props.company.description}</p>
                    <p>{this.props.company.website}</p>
                    <p>{this.props.company.country}</p>
                    <p>{this.props.company.city}</p>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.zipCode}</p>
                    <p>{this.props.company.founded}</p>
                </div>
                <section className="section-content">           
                <button type="button" onClick={() => { this.props.history.push(`/companies/${this.props.company.id}/edit`) }}>Edit</button>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</button>       
                </section>
                
            </div>
        );
    }
}

export default CompanyCard;
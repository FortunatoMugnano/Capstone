import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom';

class CompanyCard extends Component {
    render() {
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
            </div>
        );
    }
}

export default CompanyCard;
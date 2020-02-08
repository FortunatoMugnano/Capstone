import React, { Component } from "react"
import { Link } from 'react-router-dom';
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import CommentManager from '../../API/CommentManager';

class CompanyCard extends Component {
    state = {
        loadingStatus: false,
        myCard : "",
        comments: []
    }

    handleDelete = () => {
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true })
        CompanyManager.delete(this.props.company.id, authHeader)
            .then(() => this.props.history.push("/"))
    }

    componentDidMount() {
       
        if (
            this.props.user.username ===
            this.props.company.user.userName
        ) {
            this.setState({
                myCard: true
            });
        } else {
            this.setState(
                {
                    myCard: false
                },
            );
        }
    }

    getTheComments = () => {
        const authHeader = createAuthHeaders();
        CommentManager.getSingleComment(authHeader, this.props.company.id)
            .then((comments) => {
                this.setState({
                    comments: comments
                })
            })
    }


    
    render() {
        return (
            <>
            {this.state.myCard ? (
                <>
            <div className="card">
                <div className="card-content">
                    <h3> <span className="card-companyName">{this.props.company.name}</span></h3>
                    <p>{this.props.company.description}</p>
                    <p>{this.props.company.website}</p>
                    <p>{this.props.company.city}</p>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.zipCode}</p>
                    <p>{this.props.company.country}</p>
                    <p>{this.props.company.founded}</p>
                    <p>{this.props.company.industryTypes.map(i => "  " + i.industry)}</p>
                </div>
                <section className="section-content">
                <button  onClick={() => { this.getTheComments()}}>View the Comments</button>        
                <button type="button" onClick={() => { this.props.history.push(`/companies/${this.props.company.id}/edit`) }}>Edit</button>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</button>       
                </section>
            </div>
            </>
            ) : (
                <>
                <div className="card">
                <div className="card-content">
                    <h3> <span className="card-companyName">{this.props.company.name}</span></h3>
                    <p>{this.props.company.description}</p>
                    <p>{this.props.company.website}</p>
                    <p>{this.props.company.city}</p>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.zipCode}</p>
                    <p>{this.props.company.country}</p>
                    <p>{this.props.company.founded}</p>
                    <p>{this.props.company.industryTypes.map(i => "  " + i.industry)}</p>
                </div>
                 <button  onClick={() => { this.getTheComments()}}>View the Comments</button>  
                </div>
                </>
            )}
            </>
        );
    }
}

export default CompanyCard;
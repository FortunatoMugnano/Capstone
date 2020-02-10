import React, { Component } from "react"
import { Link } from 'react-router-dom';
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import CommentManager from '../../API/commentManager';
import {Card} from 'react-bootstrap'
import { Button } from 'reactstrap';

class CompanyCard extends Component {
    state = {
        loadingStatus: false,
        myCard : ""
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

    
    render() {
        return (
            <>
            {this.state.myCard ? (
                <>
            <Card bg="light" style={{ width: '40%', alignSelf: 'center', margin: '4px'}}>
                <Card.Header>
                    <h3><span className="card-companyName">{this.props.company.name}</span></h3>
                    <h5>{this.props.company.website}</h5>
                </Card.Header>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}> 
                    <h4>{this.props.company.city}, {this.props.company.address}, {this.props.company.zipCode}</h4>
                    <h4>{this.props.company.country}</h4>
                    <h5>{this.props.company.founded}</h5>
                    <h3>Industries: </h3>
                    <h4>{this.props.company.industryTypes.map(i => "  " + i.industry)}</h4>
                    <Link><Button color="secondary" onClick={() => {this.props.history.push(`/companies/${this.props.company.id}/comments`)}}>View the Comments</Button></Link>       
                    <Link><Button color="info" onClick={() => { this.props.history.push(`/companies/${this.props.company.id}/edit`) }}>Edit</Button></Link>
                    <Link><Button color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button></Link>       
                </Card.Body>
            </Card>
            </>
            ) : (
                <>
                <Card bg="light" style={{ width: '40%', alignSelf: 'center', margin: '4px'}}>
                <Card.Header> 
                    <h3> <span className="card-companyName">{this.props.company.name}</span></h3>
                    <h5>{this.props.company.website}</h5>
                </Card.Header>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}> 
                    <h4>{this.props.company.city}, {this.props.company.address}, {this.props.company.zipCode}</h4>
                    <h4>{this.props.company.country}</h4>
                    <h5>{this.props.company.founded}</h5>
                    <h3>Industries: </h3>
                    <h4>{this.props.company.industryTypes.map(i => "  " + i.industry)}</h4>
                    <Link><Button color="secondary" onClick={() => {this.props.history.push(`/companies/${this.props.company.id}/comments`)}}>View the Comments</Button></Link>
                </Card.Body>
                </Card>
                </>
            )}
            </>
        );
    }
}

export default CompanyCard;
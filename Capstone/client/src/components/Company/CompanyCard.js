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
            <Card bg="light" style={{ width: '40%', alignSelf: 'center', margin: '4px'}}>
                <Card.Header>
                    <h3><span className="card-companyName">{this.props.company.name}</span></h3>
                </Card.Header>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}> 
                    <p>{this.props.company.description}</p>
                    <p>{this.props.company.website}</p>
                    <p>{this.props.company.city}</p>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.zipCode}</p>
                    <p>{this.props.company.country}</p>
                    <p>{this.props.company.founded}</p>
                    <p>{this.props.company.industryTypes.map(i => "  " + i.industry)}</p>
                    <Link><Button color="secondary" onClick={() => { this.getTheComments()}}>View the Comments</Button></Link>       
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
                </Card.Header>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}> 
                    <p>{this.props.company.description}</p>
                    <p>{this.props.company.website}</p>
                    <p>{this.props.company.city}</p>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.zipCode}</p>
                    <p>{this.props.company.country}</p>
                    <p>{this.props.company.founded}</p>
                    <p>{this.props.company.industryTypes.map(i => "  " + i.industry)}</p>
                    <Link><Button color="secondary"  onClick={() => { this.getTheComments()}}>View the Comments</Button>  </Link> 
                </Card.Body>
                </Card>
                </>
            )}
            </>
        );
    }
}

export default CompanyCard;
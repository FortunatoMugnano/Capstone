import React, { Component } from "react"
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';
import {Card} from 'react-bootstrap'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentCard extends Component {
    state = {
        loadingStatus: false,
        myCard : ""
    }

    handleDelete = () => {
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true })
        commentManager.delete(this.props.comment.id, authHeader)
            .then(() => this.props.history.push("/companies"))
    }

    componentDidMount() {
       
        if (
            this.props.user.username ===
            this.props.comment.user.userName
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
            <Card  body outline color="danger" style={{ width: '40%', alignSelf: 'center', margin: '4px', backgroundColor: '#F0F1F2'}}>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}>
                    <h3> <span className="card-commentText">{this.props.comment.text}</span></h3>
                    <h5>Company: 
                        <p>{this.props.comment.company.name}</p>
                    </h5>
                    <Link><Button color="primary" onClick={() => { this.props.history.push(`/comments/${this.props.comment.id}/edit`) }}>Edit</Button></Link>
                    <Link><Button color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button></Link>       
                </Card.Body>      
                
            </Card>
            </>
            ) : (
                <Card body outline color="danger" style={{ width: '40%', alignSelf: 'center', margin: '4px', backgroundColor: '#F0F1F2'}}>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}>
                    <h3> <span className="card-commentText">{this.props.comment.text}</span></h3>
                    <h5>Company : 
                        <p>{this.props.comment.company.name}</p>
                    </h5>
                    <h5>Created by: 
                        <p> {this.props.comment.user.firstName}</p>
                    </h5>
                    </Card.Body>
                </Card>
    
            
            )}
            </>
        );
    }
}

export default CommentCard;
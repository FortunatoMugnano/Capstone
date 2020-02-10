import React, { Component } from "react"
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';
import {Card} from 'react-bootstrap'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class CompanyCommentCard extends Component {
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
            this.props.user.id ==
            this.props.comment.applicationUserId
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
       console.log(this.props)
        return (
                <>
                {this.state.myCard ? (
                    <Card  body outline color="danger" style={{ width: '40%', alignSelf: 'center', margin: '4px', backgroundColor: '#F0F1F2'}}>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}>
                    <h3> <span className="card-commentText">{this.props.comment.text}</span></h3>
                    <h5>Company: 
                        <p>{this.props.company.name}</p>
                    </h5>
                    <Link><Button color="primary" onClick={() => { this.props.history.push(`/comments/${this.props.comment.id}/edit`) }}>Edit</Button></Link>
                    <Link><Button color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button></Link>       
                </Card.Body>      
            </Card>
                ): ( 
               <Card  body outline color="danger" style={{ width: '40%', alignSelf: 'center', margin: '4px', backgroundColor: '#F0F1F2'}}>
                <Card.Body style={{  backgroundColor: '#9CADCE'}}>
                  <h3> <span className="card-commentText">{this.props.comment.text}</span></h3>
                   <h5>Company: 
                    <p>{this.props.company.name}</p>
                   </h5>
                 </Card.Body>
               </Card>
                )}
            
            
            </>
        );
    }
}

export default CompanyCommentCard;
import React, { Component } from "react"
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';

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
            <div className="card">
                <div className="card-content">
                    <h5> <span className="card-commentText">{this.props.comment.text}</span></h5>
                    <p>Company: {this.props.comment.company.name}</p>
                </div>
                <section className="section-content">         
                <button type="button" onClick={() => { this.props.history.push(`/comments/${this.props.comment.id}/edit`) }}>Edit</button>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</button>       
                </section>
            </div>
            </>
            ) : (
                <div className="card">
                <div className="card-content">
                    <h5> <span className="card-commentText">{this.props.comment.text}</span></h5>
                    <p>Company : {this.props.comment.company.name}</p>
                    <p>Created by: {this.props.comment.user.firstName}</p>
                </div>
                </div>
    

            
            )}
            </>
        );
    }
}

export default CommentCard;
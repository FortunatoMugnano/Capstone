import React, { Component } from 'react'
import CommentCard from './CommentCard'
import CommentManager from '../../API/CommentManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';



class CommentList extends Component {
    state = {
        comments: [],
    }

    

    componentDidMount() {
        const authHeader = createAuthHeaders();
        CommentManager.getComments(authHeader)
            .then((comments) => {
                this.setState({
                    comments: comments
                })
            })
    }

    render() {
       

        return ( 
            <>
             <section className="section-content">           
             <Link to={'/comments/new'}><button>Add a Comment</button></Link>       
             </section>
                <div className="container-cards">
                    {this.state.comments.map(comment =>
                        <CommentCard key={comment.id} Id={comment.id} comment={comment}  {...this.props} />
                    )}
                </div>
            </>
        )
    }
}
export default CommentList
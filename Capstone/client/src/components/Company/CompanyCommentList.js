import React, { Component } from 'react'
import CommentCard from '../Comment/CommentCard';
import commentManager from '../../API/commentManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';
import { Button} from 'reactstrap';
import CompanyCommentCard from '../Comment/CompanyCommentCard';



class CompanyCommentList extends Component {
    state = {
        comments: [],
        company: ""
    }

    

    componentDidMount() {
            const authHeader = createAuthHeaders();
            commentManager.getCompanyWithComments(this.props.companyId, authHeader)
                .then((company) => {
                 
                    this.setState({
                        comments: company.comments,
                        company: company
                    })
                })
    }

    render() {
        return ( 
            <>
             <section className="section-content">           
             <Link to={'/comments/new'}><Button color="danger">Add a Comment</Button></Link>       
             </section>

             {this.state.comments.length ? (
                <div className="container-cards">
                    {this.state.comments.map(comment =>
                        <CompanyCommentCard key={comment.id} Id={comment.id} comment={comment} company={this.state.company} user={this.props.user} {...this.props} />
                    )}
                </div>
             ):(
              <h2>No Comments for this company</h2>
             )}
                
            </>
        )
    }
}
export default CompanyCommentList;
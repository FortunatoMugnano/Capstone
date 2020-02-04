import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import commentManager from '../API/commentManager';


class Home extends Component {
  state = {
    comments: [],
  }

  componentDidMount() {
    const authHeader = createAuthHeaders();

    commentManager.getComments(authHeader)
      .then(comments => {
       
        this.setState({ comments: comments });
      });
  }

  render() {
    return (
      <>
        <h1>Welcome to my app</h1>
        <ul>
          {
           this.state.comments.map(comment => <li>{comment.text} from the Company {comment.name}</li>)
          }
        </ul>
      </>
    )
  }
}

export default Home;
const baseUrl = '/api/v1';


export default {
    getComments(authHeader) {
        
        return fetch(
          `${baseUrl}/Comments`, {
            headers: authHeader
          })
          
        .then(response => response.json());
      },
      getSingleComment(id, authHeader) {
        return fetch(
            `${baseUrl}/comments/${id}`, {
              headers: authHeader
            })
        .then(response => response.json());
    },

      getSingleCommentWithCompanies(id, authHeader) {
          return fetch(
              `${baseUrl}/companies/${id}?=comments`, {
                headers: authHeader
              })
          .then(response => response.json());
      },
      delete(id, authHeader) {
        return fetch(`${baseUrl}/comments/${id}`, {
            method: "DELETE",
            headers: authHeader
        })
        .then(result => result.json())
    },
    post(newComment, authHeader) {
        return fetch(`${baseUrl}/comments`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify(newComment)
        }).then(data => data.json())
    },
    update(editedComment, authHeader) {
        return fetch(`${baseUrl}/comments/${editedComment.id}`, {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify(editedComment)
        }).then(data => data.json());
      }
  }
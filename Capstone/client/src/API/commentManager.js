const baseUrl = '/api/v1';


export default {
    getComments(authHeader) {
        
        return fetch(
          `${baseUrl}/Comments`, {
            headers: authHeader
          })
          
        .then(response => response.json());
      },

      getSingleComment(id) {
          return fetch(
              `${baseUrl}/Comments/${id}`
          ).then(response => response.json());
      } 
  }
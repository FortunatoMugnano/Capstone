const baseUrl = '/api';


export default {
    getJobStatus(authHeader) {
        
        return fetch(
          `${baseUrl}/jobStatus`, {
            headers: authHeader
          })
          
        .then(response => response.json());
      },

      getSingleJobStatus(id) {
          return fetch(
              `${baseUrl}/jobStatus/${id}`
          ).then(response => response.json());
      } 
  }
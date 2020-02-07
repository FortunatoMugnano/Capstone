const baseUrl = '/api';


export default {
    getIndustryTypes(authHeader) {
        
        return fetch(
          `${baseUrl}/industrytypes`, {
            headers: authHeader
          })
          
        .then(response => response.json());
      },

      getSingleIndustryType(id) {
          return fetch(
              `${baseUrl}/industrytypes/${id}`
          ).then(response => response.json());
      } 
  }
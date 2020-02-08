const baseUrl = '/api/v1';

export default {
    getCompanies(authHeader) {
        return fetch
        (`${baseUrl}/companies/`, {
            headers: authHeader
          })
            .then(result => result.json())
    },
    getSingleCompany(id, authHeader) {
        return fetch
        (`${baseUrl}/companies/${id}`, {
            headers: authHeader
          })
            .then(result => result.json())
    },
    delete(id, authHeader) {
        return fetch(`${baseUrl}/companies/${id}`, {
            method: "DELETE",
            headers: authHeader
        })
            .then(result => result.json())
    },
    post(newCompany, authHeader) {
        return fetch(`${baseUrl}/companies`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify(newCompany)
        }).then(data => data.json())
    },
    update(editedCompany, authHeader) {
        return fetch(`${baseUrl}/companies/${editedCompany.id}`, {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify(editedCompany)
        }).then(data => data.json());
      },
      findCompany(string, authHeader) {
        return fetch(`${baseUrl}/companies?q=${string}`, {
          headers: authHeader
        }).then(result => result.json())
      }
}
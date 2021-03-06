const baseUrl = '/api/v1';

export default {
    getJobs(authHeader) {
        return fetch
        (`${baseUrl}/jobs/`, {
            headers: authHeader
          })
            .then(result => result.json())
    },
    getSingleJob(id, authHeader) {
        return fetch
        (`${baseUrl}/jobs/${id}`, {
            headers: authHeader
          })
            .then(result => result.json())
    },
    delete(id, authHeader) {
        return fetch(`${baseUrl}/jobs/${id}`, {
            method: "DELETE",
            headers: authHeader
        })
        .then(result => result.json())
    },
    post(newJob, authHeader) {
        return fetch(`${baseUrl}/jobs`, {
            method: "POST",
            headers: authHeader,
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob, authHeader) {
        return fetch(`${baseUrl}/jobs/${editedJob.id}`, {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify(editedJob)
        }).then(data => data.json());
      }
}
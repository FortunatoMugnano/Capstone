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
    delete(id) {
        return fetch(`${baseUrl}/jobs/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    post(newJob) {
        return fetch(`${baseUrl}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob) {
        return fetch(`${baseUrl}/jobs/${editedJob.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedJob)
        }).then(data => data.json());
      }
}
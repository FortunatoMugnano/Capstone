import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import JobCard from '../components/Job/JobCard';
import JobManager from '../API/JobManager';




class Home extends Component {
  state = {
    jobs: []
  }

  componentDidMount() {
    const authHeader = createAuthHeaders();
    JobManager.getJobs(authHeader)
        .then((jobs) => {
            this.setState({
                jobs: jobs
            })
        })
}

  render() {
    return (
      <>
        <h1>Enter-Q!</h1>
  
        
        <h1>Jobs</h1>
        <div className="container-cards">
                    {this.state.jobs.map(job =>
                       
                        <JobCard key={job.id} job={job}  {...this.props} />
                    )}
        </div>
      </>
    )
  }
}

export default Home;
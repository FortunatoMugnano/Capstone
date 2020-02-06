import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import JobCard from '../components/Job/JobCard';
import JobManager from '../API/JobManager';
import { withRouter, Link } from 'react-router-dom';




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

        <section className="section-content">
                   
           <Link to={'/jobs/new'}><button>Add a Job</button></Link>
                        
                    
        </section>
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


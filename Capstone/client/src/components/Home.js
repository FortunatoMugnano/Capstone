import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import JobCard from '../components/Job/JobCard';
import JobManager from '../API/JobManager';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';



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
       <h3 className="welcome">Welcome {this.props.user.username}</h3>
        <h1>Jobs</h1>

        <section className="section-content">           
           <Link to={'/jobs/new'}><Button color="danger">Add a Job</Button></Link>       
        </section>
        <div>
          {this.state.jobs.map(job =>
             <JobCard key={job.id} job={job}  {...this.props} />
          )}
        </div>
      
      </>
    )
  }
}

export default Home;


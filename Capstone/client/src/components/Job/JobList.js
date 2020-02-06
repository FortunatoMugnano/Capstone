import React, { Component } from 'react'
import JobCard from './JobCard'
import JobManager from '../../API/JobManager';
import { createAuthHeaders } from '../../API/userManager';


class JobList extends Component {
    state = {
        jobs: [],
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
             
                <div className="container-cards">
                    {this.state.jobs.map(job =>
                        <JobCard key={job.id} Id={job.Id} job={job}  {...this.props} />
                    )}
                </div>
            </>
        )
    }
}
export default JobList
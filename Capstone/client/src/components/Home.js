import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import JobCard from '../components/Job/JobCard';
import JobManager from '../API/JobManager';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../App.css';
import Board from '@lourenci/react-kanban'


const createBoard = () => {
  return {
    columns: [
      {
        id: 1,
        title: 'Dream Job',
        cards: [
        ]
      },
      {
        id: 2,
        title: 'Applied',
        cards: []
      },
      {
        id: 3,
        title: 'Interview',
        cards: []
      },
      {
        id: 4,
        title: 'Offer',
        cards: []
      },
      {
        id: 5,
        title: 'Rejected',
        cards: []
      }
    ]
  }
}


class Home extends Component {
  state = {
    jobs: [],
    jobStatusId: "",
    board: createBoard()
  }



  componentDidMount() {
    const authHeader = createAuthHeaders();
    JobManager.getJobs(authHeader)
      .then((jobs) => {
        let newBoard = createBoard()
        let dreamJob = jobs.filter(job => job.jobStatusId == 1)
        let applied = jobs.filter(job => job.jobStatusId == 2)
        let interview = jobs.filter(job => job.jobStatusId == 3)
        let rejected = jobs.filter(job => job.jobStatusId == 4)
        let offer = jobs.filter(job => job.jobStatusId == 5)
        dreamJob.forEach(e => {
          let newObject = {
            title: e.title,
            description: e.description,
            company: e.company.name,
            data: e
          }
          newBoard.columns[0].cards.push(newObject)
        })
        applied.forEach(e => {
          let newObject2 = {
            title: e.title,
            description: e.description,
            company: e.company.name,
            data: e
          }
          newBoard.columns[1].cards.push(newObject2)
        })
        interview.forEach(e => {
          let newObject3 = {
            title: e.title,
            description: e.description,
            company: e.company.name,
            data: e

          }
          newBoard.columns[2].cards.push(newObject3)
        })
        offer.forEach(e => {
          let newObject4 = {
            title: e.title,
            description: e.description,
            company: e.company.name,
            data: e
          }
          newBoard.columns[3].cards.push(newObject4)
        })
        rejected.forEach(e => {
          let newObject5 = {
            title: e.title,
            description: e.description,
            company: e.company.name,
            data: e
          }
          newBoard.columns[4].cards.push(newObject5)
        })
        this.setState({
          jobs: jobs,
          board: newBoard
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
          <Board renderCard={(content, { dragging }) => (
            <JobCard dragging={dragging}  job={content.data} {...this.props} />
          )}>{this.state.board}
          </Board>
        
      </>
    )
  }
}

export default Home;


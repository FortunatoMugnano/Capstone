import React, { Component, useState } from 'react';
import { createAuthHeaders } from '../API/userManager';
import JobManager from '../API/JobManager';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../App.css';
import Board from '@lourenci/react-kanban';
import { Card } from 'react-bootstrap'


const createBoard = () => {
  return {
    columns: [
      {
        id: 1,
        title: 'Dream Job',
        cards: []
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
        id: 5,
        title: 'Offer',
        cards: []
      },
      {
        id: 4,
        title: 'Rejected',
        cards: []
      }
    ]
  }
}


class Home extends Component {
  state = {
    jobs: [],
    board: createBoard(),
    loadingStatus: false,
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
            id: e.id,
            title: e.title,
            description: e.description,
            jobPostUrl: e.jobPostUrl,
            jobStatusId: e.jobStatusId,
            companyName: e.company.name,
            companyId: e.companyId,
            date: e.date,
            salary: e.salary
          }
          newBoard.columns[0].cards.push(newObject)
        })
        applied.forEach(e => {
          let newObject2 = {
            id: e.id,
            title: e.title,
            description: e.description,
            jobPostUrl: e.jobPostUrl,
            jobStatusId: e.jobStatusId,
            companyName: e.company.name,
            companyId: e.companyId,
            date: e.date,
            salary: e.salary
            
          }
          newBoard.columns[1].cards.push(newObject2)
        })
        interview.forEach(e => {
          let newObject3 = {
            id: e.id,
            title: e.title,
            description: e.description,
            jobPostUrl: e.jobPostUrl,
            jobStatusId: e.jobStatusId,
            companyName: e.company.name,
            companyId: e.companyId,
            date: e.date,
            salary: e.salary

          }
          newBoard.columns[2].cards.push(newObject3)
        })
        offer.forEach(e => {
          let newObject4 = {
            id: e.id,
            title: e.title,
            description: e.description,
            jobPostUrl: e.jobPostUrl,
            jobStatusId: e.jobStatusId,
            companyName: e.company.name,
            companyId: e.companyId,
            date: e.date,
            salary: e.salary
          }
          newBoard.columns[3].cards.push(newObject4)
        })
        rejected.forEach(e => {
          let newObject5 = {
            id: e.id,
            title: e.title,
            description: e.description,
            jobPostUrl: e.jobPostUrl,
            jobStatusId: e.jobStatusId,
            companyName: e.company.name,
            companyId: e.companyId,
            date: e.date,
            salary: e.salary
          }
          newBoard.columns[4].cards.push(newObject5)
        })
        this.setState({
          jobs: jobs,
          board: newBoard
        })
      })
  }



  handleCardDrag = (card, source, destination) => {
    const newBoard = { ...this.state.board }
    const boardColumn = newBoard.columns.find(e => e.id == source.fromColumnId)
    boardColumn.cards = boardColumn.cards.filter(e => e.id != card.id)
    const newDestination = newBoard.columns.find(e => e.id == destination.toColumnId)
    newDestination.cards.push(card)
    this.setState({
      board: newBoard
    })
    //Send post request
    const authHeader = createAuthHeaders();
    this.setState({ loadingStatus: true });
    card.jobStatusId = newDestination.id
    JobManager.update(card, authHeader)
        .then(() => this.props.history.push("/"))
}

  


  render() {
    return (
      <>
        <h3 className="welcome">Welcome {this.props.user.username}</h3>
        <h1>Your Jobs</h1>
        <section className="section-content">
          <Link to={'/jobs/new'}><Button color="danger">Add a Job</Button></Link>
        </section>
        {
          this.state.jobs.length ? (
            <Board onCardDragEnd={this.handleCardDrag}
              renderCard={(content, { dragging }) => (
                <Card dragging={dragging} border="light" style={{
                  width: '13rem', height: '21rem', backgroundColor: '#A035FE', border: 'solid',
                  borderRadius: '10px', display: "flex"
                }}>
                  <Link onClick={() => this.props.history.push(`/jobs/${content.id}`)}><Card.Header>
                    <h4 style={{ color: '#dee2e6' }}>{content.title}</h4>
                  </Card.Header></Link>
                  <Card.Body>
                    <h4 style={{ color: 'white' }}>Title</h4>
                    <h5>{content.description}</h5>
                    <h4 style={{ color: 'white' }}>Company</h4>
                    <h5>{content.companyName}</h5>
                  </Card.Body>
                  
                </Card>
              )} >
              {this.state.board}
            </Board>
          ) : null
        }


      </>
    )
  }
}

export default Home;


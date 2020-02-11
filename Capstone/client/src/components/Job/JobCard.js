import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom';
import {Card} from 'react-bootstrap'
import { Button } from 'reactstrap';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>



class JobCard extends Component {


    render() {
        if(!this.props.job ){
            return null
        }
        return (
        <Card border="light" style={{ width: '18rem' , backgroundColor: '#A035FE', border: 'solid',
         borderRadius: '10px'}}>
          <Card.Header><h3 style={{color: 'white'}}>{this.props.job.title}</h3></Card.Header>
        <Card.Body>
        <Card.Title><h5>{this.props.job.description}</h5></Card.Title>
          <Card.Text>
            <h5>{this.props.job.company.name}</h5>
            <h5>{this.props.job.jobStatus.status}</h5>
          </Card.Text>
          <Link to={`/jobs/${this.props.job.id}`}><Button color="secondary">Details</Button></Link>
        </Card.Body>
        </Card>
        );
    }
}

export default withRouter(JobCard);
import React from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav } from "react-bootstrap";




export default function Navbar(props)  {
  



  
      return (
        
        <>
          {
            props.user ? (
              <>
              <Nav defaultActiveKey="/" as="ul" >
              <Nav.Item>
              <Nav.Link href="/"><img className="logo" src="../../images/ENTER-Q-Logo.png" alt="logo" /></Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/companies">Companies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/comments">Comments </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={props.logout}>
              <Nav.Link eventKey="link-1" >Log out</Nav.Link>
              </Nav.Item>
              <p className="welcome">Welcome {props.user.username}</p>
              </Nav>
             
              
             </>
            ) : (
              <>
            <Nav defaultActiveKey="/" as="ul">
             <Nav.Item as="li">
             <Nav.Link href="/login">Login</Nav.Link>
             </Nav.Item>
             <Nav.Item as="li">
             <Nav.Link href="/register">Register</Nav.Link>
             </Nav.Item>
             </Nav>
             </>
            )
          }
          </>
  )
}



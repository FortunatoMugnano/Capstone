import React from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav } from "react-bootstrap";




export default function Navbar(props)  {
  



  
      return (
        <Nav defaultActiveKey="/" as="ul">
        
          {
            props.user ? (
              <>
              <Nav.Item as="li">
              <Nav.Link href="/">Hello {props.user.username}</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
              <Nav.Link href="/companies">Companies</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
              <Nav.Link href="/comments">Comments </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" onClick={props.logout}>
              <Nav.Link eventKey="link-1" >Log out</Nav.Link>
              </Nav.Item>
             </>
            ) : (
              <>
             <Nav.Item as="li">
             <Nav.Link eventKey="/login">Login</Nav.Link>
             </Nav.Item>
             <Nav.Item as="li">
             <Nav.Link eventKey="/register">Register</Nav.Link>
             </Nav.Item>
             </>
            )
          }
        </Nav>

       //<nav className="header">
     // <ul className="nav-items">
      //  {
     //     props.user ? (
         //   <>
        //      <li className="nav-item">Hello {props.user.username}</li>
       //       <li className="nav-item" onClick={props.logout}>Log out</li>
        //    </>
     //     ) : (
       //       <>
       //         <li className="nav-item">
        //          <Link to="/login">Login</Link>
        //        </li>
       //         <li className="nav-item">
         //         <Link to="/register">Register</Link>
          //      </li>
       //       </>
      //      )
      //  }
     // </ul>
    //</nav>
  )
}


//export default NavBar;
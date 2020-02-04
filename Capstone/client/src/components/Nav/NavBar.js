import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";



export default function Navbar()  {
  



  
      return (
        <Nav defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
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
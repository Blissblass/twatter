import React, { useEffect } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const navbar = (props) => {
  let currUser = props.currUser

  useEffect(() => {
  }, []);

  const handleLogout = () => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content")
    fetch("/users/sign_out", {
      method: "DELETE",   
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
    });
    props.setCurrUser(null);
  };

  if(currUser) {
    return(
      <Navbar bg="primary mx-0"  >
        <LinkContainer to="/">
          <Navbar.Brand className="px-4 text-large text-white">Twatter</Navbar.Brand>
        </LinkContainer>
        <Button onClick={handleLogout} className="text-med text-white nav navbar-nav px-4 mr-auto">Log Out</Button>
      </Navbar>
    )

  } else {

    return(
    <Navbar bg="primary mx-0" >
        <LinkContainer to="/">
          <Navbar.Brand className="px-4 text-large text-white">Twatter</Navbar.Brand>
        </LinkContainer>
      <LinkContainer to="/login">
        <Button className="text-med text-white nav navbar-nav px-4 btn-block" >Login</Button>
      </LinkContainer>
      <LinkContainer to="/signUp">
        <Button className="text-med text-white nav navbar-nav px-4 mr-auto">Sign up</Button>
      </LinkContainer>
    </Navbar>
    )
  }
};


export default navbar;
import React, { useEffect } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import NavbarForm from "./NavbarForm";
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";

const Navibar = (props) => {
  const { currUser, setCurrUser } = useContext(UserContext);

  useEffect(() => {
  }, [currUser]);

  const handleLogout = () => {
    fetch("/users/sign_out", {
      method: "DELETE",   
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setCurrUser(null);
    localStorage.removeItem('currUser');
  };

  if(currUser) {
    return(
      <Navbar bg="primary mx-0 float-right sticky-top ">

        <LinkContainer to="/">
          <Navbar.Brand className="px-4 text-large text-white">Twatter</Navbar.Brand>
        </LinkContainer>
        
        <LinkContainer to={`/user/${currUser.id}`}>
          <Button className="text-med text-white nav navbar-nav px-4 btn-block ml-auto">{currUser.username}</Button>
        </LinkContainer>

        <Button onClick={handleLogout} className="text-med text-white nav navbar-nav px-4 ml-auto">Log Out</Button>

        <NavbarForm />
      </Navbar>
    )

  } else {

    return(
    <Navbar bg="primary mx-0" >

      <LinkContainer to="/">
        <Navbar.Brand className="px-4 text-large text-white">Twatter</Navbar.Brand>
      </LinkContainer>

      <LinkContainer to="/login">
        <Button className="text-med text-white nav navbar-nav px-4 btn-block">Login</Button>
      </LinkContainer>

      <LinkContainer to="/signUp">
        <Button className="text-med text-white nav navbar-nav px-4 mr-auto">Sign up</Button>
      </LinkContainer>

    </Navbar>
    )
  }
};


export default Navibar;
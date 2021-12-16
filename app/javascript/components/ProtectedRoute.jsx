import React from 'react';
import { Redirect } from 'react-router';
import Home from './Home';
import Profile from './Profile'
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";


const ProtectedRoute = (props) => {
  const { currUser } = useContext(UserContext);
  return(
    currUser ? <Home /> : <Redirect to ="/login" />
  )
};

const ProfileRedirect = (props) => {
  const { currUser } = useContext(UserContext);
  return(
    currUser ? <Profile setCurrUser={props.setCurrUser} currUser={props.currUser} /> : <Redirect to="/" /> 
  )
};

export { ProtectedRoute, ProfileRedirect }
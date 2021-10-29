import React from 'react';
import { Redirect } from 'react-router';
import Home from './Home';
import Profile from './Profile'

const ProtectedRoute = (props) => {
  return(
    props.currUser.id ? <Home currUser={props.currUser} /> : <Redirect to ="/login" />
  )
};

const ProfileRedirect = (props) => {
  return(
    props.currUser ? <Profile setCurrUser={props.setCurrUser} currUser={props.currUser} /> : <Redirect to="/" /> 
  )
};

export { ProtectedRoute, ProfileRedirect }
import React from 'react';
import { Redirect } from 'react-router';
import Home from './Home';

const ProtectedRoute = (props) => {
  return(
  props.currUser ? <Home currUser={props.currUser} /> : <Redirect to ="/login" />
  )
};

export default ProtectedRoute;
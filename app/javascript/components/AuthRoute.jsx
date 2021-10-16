import React from "react";
import { Redirect } from "react-router"
import Login from "./Login";
import SignUp from "./SignUp"


const LoginRedirect = (props) => {
  return(
    props.currUser ? <Redirect to="/" /> : <Login setCurrUser={props.setCurrUser} /> 
  )
};

const SignupRedirect = (props) => {
  return(
    props.currUser ? <Redirect to="/" /> : <SignUp setCurrUser={props.setCurrUser} /> 
  )
}

const AuthRoute = props => {
  return(
    props.currUser ? <Redirect to="/" /> : props.component 
  )
};

export { LoginRedirect, SignupRedirect, AuthRoute }
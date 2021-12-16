import React from "react";
import { Redirect } from "react-router"
import Login from "./Login";
import SignUp from "./SignUp"
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";

const LoginRedirect = (props) => {
  const { currUser } = useContext(UserContext);
  return(
    currUser ? <Redirect to="/" /> : <Login setCurrUser={props.setCurrUser} /> 
  )
};

const SignupRedirect = (props) => {
  const { currUser } = useContext(UserContext);
  return(
    currUser ? <Redirect to="/" /> : <SignUp setCurrUser={props.setCurrUser} /> 
  )
}

export { LoginRedirect, SignupRedirect }
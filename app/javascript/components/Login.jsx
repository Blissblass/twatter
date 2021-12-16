import React, { useState } from "react";
import ErrorContext from "./Contexts/ErrorContext";
import { useContext } from "react";
import UserContext from "./Contexts/UserContext";

const Login = (props) => {
  const { setErrors } = useContext(ErrorContext);
  const { setCurrUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targets = Array.from(e.currentTarget);
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const userData = {
      user: {
        "email": targets[0].value,
        "password": targets[1].value,
      }
    };

    await fetch('/users/sign_in', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': CSRF
      }),
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
      .then(data => {
        if(data.error) {
          setErrors(old => [...old, data.error]);
        }
      });

    await fetch('http://127.0.0.1:3000/api/current_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
      .then(data => {
        setCurrUser(data)
        localStorage.setItem('currUser', JSON.stringify(data));
        setErrors([]);
      });
  };
  

  return(
    <div className="row m-0 my-3 align-items-center justify-content-center">
      <div className="col-sm-6 card" >
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Log In</h4>
          <form onSubmit={handleSubmit}>
            <label  htmlFor="user[email]"    className="form-label text-med">Email Adress</label>
            <input  type="email"         className="form-control mb-3"          id="user[email]" placeholder="Email" />

            <label  htmlFor="user[password]" className="form-label text-med">Password</label>
            <input  type="password"     className="form-control mb-3"          id="user[pasword]"  placeholder="Password" />

            <button type="submit"        className="btn btn-primary">Submit</button>
          </form >
        </div>
      </div>
    </div>
  )
};

export default Login;
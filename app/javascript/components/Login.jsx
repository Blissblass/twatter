import React, { useState } from "react";

const Login = (props) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targets = Array.from(e.currentTarget);
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const userData = {
      user: {
        "username": targets[0].value,
        "email": targets[1].value,
        "password": targets[2].value,
      }
    };

    await fetch('/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(userData)
    })

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
        props.setCurrUser(data)})
    .catch(err => console.log(`Err: ${err}`))
  };
  

  return(
    <div className="row m-0 my-3 align-items-center justify-content-center">
      <div className="col-sm-6 card" >
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Log In</h4>
          <form onSubmit={handleSubmit}>
            <label  htmlFor="user[username]" className="form-label text-med">Username</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend"> 
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input  type="text"          className="form-control" id="user[username]" placeholder="Username" aria-describedby="basic-addon1" />
            </div>

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
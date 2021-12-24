import React from "react";
import ErrorContext from "./Contexts/ErrorContext";
import { useContext } from "react";
import UserContext from "./Contexts/UserContext";

const Login = (props) => {
  const { setErrors } = useContext(ErrorContext);
  const { setCurrUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targets = Array.from(e.currentTarget);
    const userData = {
      user: {
        "email": targets[0].value,
        "password": targets[1].value,
      }
    };

    fetch('/users/sign_in', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
      .then(data => {
        if(data.error) {
          setErrors(old => [...old, data.error]);
        } else {
          setCurrUser(data)
          localStorage.setItem('currUser', JSON.stringify(data));
          setErrors([]);
        }
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
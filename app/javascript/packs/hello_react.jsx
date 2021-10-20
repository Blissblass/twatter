import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import { LoginRedirect, SignupRedirect } from '../components/AuthRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/stylesheets/application.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = props => {
 
  let [currUser, setCurrUser] = useState({id: null, username: null});

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/current_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .catch(err => console.log(err))
    .then(data => data.json())
      .then(data => setCurrUser(data))
  }, []);

 return(
   <div className="">
    <Router>
      <Navbar currUser={currUser} setCurrUser={setCurrUser}  />     
      <Switch>
        <Route exact path="/" render={(props) => <ProtectedRoute {...props} currUser={currUser} />} />
        <Route exact path="/login" render={(props) => <LoginRedirect {...props} currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route exact path="/signUp" render={(props) => <SignupRedirect {...props} currUser={currUser} setCurrUser={setCurrUser}/>} />
        <Route exact path="/user/:id" render={(props) => <Profile {...props} currUser={currUser} />} />            
      </Switch>
    </Router>
  </div>
 )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})

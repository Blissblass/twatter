import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../components/Navbar';
import UserFollows from '../components/UserFollows';
import UserFollowers from '../components/UserFollowers';
import PostPage from '../components/PostPage';
import { ProtectedRoute, ProfileRedirect } from '../components/ProtectedRoute';
import { LoginRedirect, SignupRedirect } from '../components/AuthRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/stylesheets/application.css';
import ErrorContext from '../components/Contexts/ErrorContext';
import Errors from '../components/Errors';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = props => {
 
  let [currUser, setCurrUser] = useState({id: null, username: null});
  const [errors, setErrors] = useState([]); // Errors will be an array of strings

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/current_user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
      .then(data => setCurrUser(data));
  }, []);

 return(
   <div>
    <Router>
      <Navbar currUser={currUser} setCurrUser={setCurrUser}  />    
      <ErrorContext.Provider value={{errors, setErrors}}>
        <div className="container">
          <Switch>
            <Route exact path="/" render={(props) => <ProtectedRoute {...props} currUser={currUser} />} />
            <Route exact path="/login" render={(props) => <LoginRedirect {...props} currUser={currUser} setCurrUser={setCurrUser} />} />
            <Route exact path="/signUp" render={(props) => <SignupRedirect {...props} currUser={currUser} setCurrUser={setCurrUser}/>} />
            <Route exact path="/user/:id" render={(props) => <ProfileRedirect {...props} setCurrUser={setCurrUser} currUser={currUser} />} />
            <Route exact path="/user/:id/follows" render={(props) => <UserFollows {...props} />} />         
            <Route exact path="/user/:id/followers" render={(props) => <UserFollowers {...props} />} />     
            <Route exact path="/post/:id" render={(props) => <PostPage {...props} currUser={currUser} />} />    
          </Switch>
          <Errors />
        </div>
      </ErrorContext.Provider>
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

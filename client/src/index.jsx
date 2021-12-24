import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Navibar from './components/Navbar';
import UserFollows from './components/UserFollows';
import UserFollowers from './components/UserFollowers';
import PostPage from './components/PostPage';
import { ProtectedRoute, ProfileRedirect } from './components/ProtectedRoute';
import { LoginRedirect, SignupRedirect } from './components/AuthRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/application.css';
import ErrorContext from './components/Contexts/ErrorContext';
import Errors from './components/Errors';
import UserContext from './components/Contexts/UserContext';
import NoMatch from './components/NoMatch';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const App = props => {
 
  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('currUser')));
  const [errors, setErrors] = useState([]); // Errors will be an array of strings

 return(
   <div>
    <Router>
    <UserContext.Provider value={{currUser, setCurrUser}}>
      <Navibar currUser={currUser} setCurrUser={setCurrUser}  />    
      <ErrorContext.Provider value={{errors, setErrors}}>
          <div className="container">
            <Switch>,
              <Route exact path="/home" render={(props) => <ProtectedRoute {...props} />} />
              <Route exact path="/login" render={(props) => <LoginRedirect {...props} />} />
              <Route exact path="/signUp" render={(props) => <SignupRedirect {...props} />} />
              <Route exact path="/user/:id" render={(props) => <ProfileRedirect {...props} />} />
              <Route exact path="/user/:id/follows" render={(props) => <UserFollows {...props} />} />         
              <Route exact path="/user/:id/followers" render={(props) => <UserFollowers {...props} />} />     
              <Route exact path="/post/:id" render={(props) => <PostPage {...props} />} />  
              <Route exact path="*" render={(props) => <NoMatch {...props} />} />
            </Switch>
            <Errors />
          </div>
      </ErrorContext.Provider>
      </UserContext.Provider>
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
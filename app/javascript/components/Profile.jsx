import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { withRouter } from "react-router";
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  const [addData, setAddData] = useState({image: null, follows: null, followers: null});


  const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  const userId = props.match.params.id;


  useEffect(() => {
    fetch(`/api/get_user_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify({
        id: userId
      })
    })
    .then(data => data.json())
    .then(data => { 
      setProfUser(data.user);
      setProfPosts(data.twats);
      setAddData(data.additionalData);
    });

  }, [userId, props.currUser.username]);




  return(
    <div className="row justify-content-center mx-0 mt-3">
      <ProfileInfo currUser={props.currUser} setCurrUser={props.setCurrUser} addData={addData} setAddData={setAddData} profUser={profUser} />
      
      <Feed posts={profPosts} currUser={props.currUser} />
    </div>
  )
};

export default withRouter(Profile);
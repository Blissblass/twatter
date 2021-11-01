import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  const [addData, setAddData] = useState({image: null, follows: null, followers: null});
  const [isFollowing, setFollowing] = useState(false);

  const userId = props.match.params.id;
  const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  const ownProfile = props.currUser.id == userId;
  const noChange = inputName == profUser.username && !inputFile

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

  useEffect(() => {
    fetch('/api/already_following', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify({
          "follower_id": props.currUser.id,
          "followee_id": userId
        })
      })
      .then(data => data.json())
      .then(data => {
        if(data) {
          setFollowing(true);
        };
      });
  }, [props.currUser.id]);

  const handleSubscription = (e) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "follower_id": props.currUser.id,
      "followee_id": userId 
    };

    e.preventDefault();
    if(isFollowing) {
      fetch('/api/unfollow', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      });

      addData.followers -= 1;
      setFollowing(false);
    } else {
      fetch('/follows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      });

      setFollowing(true);
      addData.followers += 1;
    }
  };

  const toggleEdit = () => setEditing(oldState => !oldState);

  // TODO: Refactor this shit !!! 150+ lines of code for one single component ????
  return(
    <div className="row justify-content-center mx-0 mt-3">
        <ProfileInfo addData={addData} profUser={profUser} />
        
        {!ownProfile ?

          <Button onClick={handleSubscription}>
            {isFollowing ? "Remove Follow" : "Follow" }
          </Button>

          :

          <div>
            <Button disabled={noChange} className="my-1" style={{display: isEditing ? "block" : "none"}} onClick={handleProfileEdit}>
              Confirm
            </Button>

            <Button onClick={toggleEdit}>
              Edit Profile
            </Button> 
          </div>
        
        }
      
      <Feed posts={profPosts} currUser={props.currUser} />
    </div>
  )
};

export default withRouter(Profile);
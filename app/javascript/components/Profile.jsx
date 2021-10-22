import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  const [isFollowing, setFollowing] = useState(false);
  

  const userId = props.match.params.id;
  const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  const ownProfile = props.currUser.id == userId;

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
    });

  }, []);

  useEffect(() => {
    if(props.currUser) {
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
    }
  }, [props.currUser]);

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
    }
  };

  return(
    <div className="row justify-content-center mx-0">
      <div className="card col-md-6 m-4">
        <h1>{profUser.username}'s profile</h1>

        <Button style={{display: ownProfile ? "none" : "block"}} onClick={handleSubscription}>
          {isFollowing ? "Remove Follow" : "Follow" }
        </Button>

      </div>
      <Feed posts={profPosts} currUser={props.currUser} />
    </div>
  )
};

export default withRouter(Profile);
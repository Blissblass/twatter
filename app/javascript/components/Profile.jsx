import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  const [profImage, setProfImage] = useState("");
  const [isFollowing, setFollowing] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [inputName, setInputName] = useState({username: ""});
  const [inputFile, setInputFile] = useState();
  

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
      setProfImage(data.image);
      setInputName(data.user.username);
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

  const toggleEdit = () => setEditing(oldState => !oldState);

  const handleProfileEdit = () => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    

    if(inputName != profUser.username) {
      fetch('/api/update_user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify({user: {username: inputName}})
      })
      .then(data => data.json())
      .then(data => props.setCurrUser(data))
    }

    if(inputFile) {
      const formData = new FormData();
      formData.append('img', inputFile)
      fetch('/api/change_user_image', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: formData
      });
    }
    setEditing(false);
    
  }


  return(
   
    <div className="row justify-content-center mx-0 mt-3">
      <div className="card col-md-6 m-4 mw-100"> 
        <div className="row"> 
          <div className="col-md-8 col-sm-8">
            <img src={profImage} alt="User's profile image" className="rounded w-25" style={{}} />
            <input 
            style={{display: isEditing ? "block" : "none"}} 
            type="file" 
            className="form-control my-1"
            onChange={(e) => setInputFile(e.currentTarget.files[0])} 
            />
          </div>
        </div>
        <h1 className="card-text" style={{display: isEditing ? "none" : "block"}}>@{profUser.username}</h1> 
        <input 
          type="text"
          className="form-control my-2" 
          value={inputName} 
          style={{display: !isEditing ? "none" : "block", width: 300}} 
          onChange={(e) => setInputName(e.currentTarget.value)}
        />

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


      </div>
      
      <Feed posts={profPosts} currUser={props.currUser} />
    </div>
  )
};

export default withRouter(Profile);
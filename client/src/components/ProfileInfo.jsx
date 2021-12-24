import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";

const ProfileInfo = (props) => {
  const { currUser, setCurrUser } = useContext(UserContext);

  const addData = props.addData;
  const profUser = props.profUser;

  const [inputName, setInputName] = useState("");
  const [inputFile, setInputFile] = useState();
  const [isFollowing, setFollowing] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const noChange = inputName === profUser.username && !inputFile
  const userId = props.match.params.id;
  const ownProfile = currUser.id === userId;

  useEffect(() => {
    if(profUser.username) {
      setInputName(profUser.username); 
    }
  }, [profUser.username]);

  useEffect(() => {
    fetch('/api/already_following', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "follower_id": currUser.id,
          "followee_id": userId
        })
      })
      .then(data => data.json())
      .then(data => {
        if(data) {
          setFollowing(true);
        };
      });
  }, [currUser.id, userId]);


  const handleProfileEdit = () => {

    if(inputName !== profUser.username) {
      fetch(`/api/update_user/${currUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {username: inputName}})
      })
      .then(data => data.json())
      .then(data => setCurrUser(data))
    }

    if(inputFile) {
      const formData = new FormData();
      formData.append('img', inputFile)
      fetch(`/api/change_user_image/${currUser.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });
      const newImage = URL.createObjectURL(inputFile);
      const newUserObj = addData;
      addData.image = newImage; 
      props.setAddData(newUserObj);
    }

    setEditing(false);
  }

  const handleSubscription = (e) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "follower_id": currUser.id,
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

    } 

    else {
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


  return(

    <div className="card col-md-6 m-4 mw-100"> 
        
        <div className="row"> 
          
          <div className="col-md-8 col-sm-8">
            <img src={addData.image} alt="User" className="rounded w-25" />
            <input 
            style={{display: isEditing ? "block" : "none"}} 
            type="file" 
            className="form-control my-1"
            onChange={(e) => setInputFile(e.currentTarget.files[0])} 
            />
          </div>

        </div>

        <h1 className="card-text" style={{display: isEditing ? "none" : "block"}}>@{profUser.username}</h1> 
        
        <div className="d-flex">
          <h4 style={{display: isEditing ? "none" : "block"}}>
            <Link style={{color:"black", textDecoration: "none"}}to={`/user/${profUser.id}/followers`}>
              Followers: {addData.followers}
            </Link>
          </h4>
          <h4 className="mx-2" style={{display: isEditing ? "none" : "block"}}>
            <Link style={{color:"black", textDecoration: "none"}} to={`/user/${profUser.id}/follows`}>
              Following: {addData.follows}
            </Link>
          </h4>
        </div>

        <input 
          type="text"
          className="form-control my-2" 
          value={inputName} 
          style={{display: !isEditing ? "none" : "block", width: 300}} 
          onChange={(e) => setInputName(e.currentTarget.value)}
        />

        <Button disabled={noChange} className="my-1" style={{display: isEditing ? "block" : "none"}} onClick={handleProfileEdit}>
          Confirm
        </Button>

        {!ownProfile ?

          <Button onClick={handleSubscription}>
            {isFollowing ? "Remove Follow" : "Follow" }
          </Button>

            :

            <div>
              <Button onClick={toggleEdit}>
                Edit Profile
              </Button> 
            </div>

        }
      </div>
      
  )
};

export default withRouter(ProfileInfo);
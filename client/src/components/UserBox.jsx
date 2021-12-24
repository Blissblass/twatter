import React from 'react';
import { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";

const UserBox = (props) => {
  const { currUser } = useContext(UserContext);

  const [hover, setHover] = useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    props.setQueryStr("");
    history.push(`/user/${props.user.id}`);
  };

  return(
    <div 
    onMouseEnter={(e) => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={handleClick}
    style={{backgroundColor: hover ? '#e9e9e9' : 'white', cursor: hover ? 'pointer' : '', width: 300}} 
    className="card position-relative text-center"
    >
      {
      props.user.id === currUser.id ? 
        <h6>{props.user.username} <em>(You)</em></h6> 
          :
        <h6>{props.user.username}</h6>
      }
    </div>
  )
};

export default withRouter(UserBox);
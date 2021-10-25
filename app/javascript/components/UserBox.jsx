import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory, withRouter } from 'react-router-dom';

const UserBox = (props) => {

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
    onMouseDown={handleClick}
    onClick={handleClick}
    style={{backgroundColor: hover ? '#e9e9e9' : 'white', cursor: hover ? 'pointer' : ''}} 
    className="card position-relative"
    >
      <h6>{props.user.username}</h6>
    </div>
  )
};

export default withRouter(UserBox);
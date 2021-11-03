import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedUser = (props) => {

  return(
    <Link to={`/user/${props.user.id}`} style={{textDecoration:"none", color:"black"}} >
      <h3>{props.user.username}</h3>
      <img className="w-10"/>
    </Link>
  )
};

export default RecommendedUser;
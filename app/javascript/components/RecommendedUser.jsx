import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedUser = (props) => {

  return(
    <div>
      
      <Link to={`/user/${props.user.id}`} style={{textDecoration:"none", color:"black"}} >
        <img src={props.image} style={{width: 50 }}/>
        <h3>{props.user.username}</h3>
      </Link>
    </div>
  )
};

export default RecommendedUser;
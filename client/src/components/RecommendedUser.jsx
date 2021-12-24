import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedUser = (props) => {
    return(
        <Link to={`/twatter/user/${props.user.id}`} style={{textDecoration:"none", color:"black"}} >
          <div className="my-1 border" style={{display: "flex", justifyContent: "space-between"}}>  
            <img src={props.image} className="border-right-0 border-dark" style={{width: 40}} alt="Recommended user" />
            <h4>{props.user.username}</h4>
          </div>
        </Link>
    )

};

export default RecommendedUser;
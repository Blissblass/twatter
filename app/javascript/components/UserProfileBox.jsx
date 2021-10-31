import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileBox = (props) => {

  const user = props.data[0];
  const image = props.data[1];

  return(
    <div className="card col-md-6 m-4">
      <img src={image} className="w-25" />
      <h3><Link style={{textDecoration:"none"}} to={`/user/${user.id}`}>@{user.username}</Link></h3>
    </div>
  )
}

export default UserProfileBox;
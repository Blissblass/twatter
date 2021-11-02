import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FollowRecommendations = (props) => {

  // Very W.I.P !!!!!!
  const [users, setUsers] = useState([])
  useEffect(()=> {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch('/api/follow_recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify({
        id: props.currUser.id
      })
    })
    .then(data => data.json())
    .then(data => {setUsers(data); console.log(data);});
  }, []);

  return(
    <div className="col-md-2 mt-2 mx-5">
      <div className="card" style={{width:250}}>
        <h3>Relevant People:</h3>
        {users.map(user => <Link style={{textDecoration:"none", color:"black"}}to={`/user/${user.id}`} key={user.id}><h3>{user.username}</h3></Link>)}
      </div>
    </div>
  )
};

export default FollowRecommendations;
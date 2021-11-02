import React, { useEffect, useState } from 'react';

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
      <div className="card">
        <h3>Follow these guys:</h3>
        {users.map(user => <h1 key={user.id}>{user.username}</h1>)}
      </div>
    </div>
  )
};

export default FollowRecommendations;
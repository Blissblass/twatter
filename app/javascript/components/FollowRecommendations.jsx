import React, { useEffect, useState } from 'react';

const FollowRecommendations = (props) => {

  // Very W.I.P !!!!!!

  useEffect(()=> {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const [users, setUsers] = useState([])
    
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
    .then(data => setUsers(data));
  }, []);

  return(
    <div className="col-md-2">
      <div className="card">
        <h3>Follow these guys:</h3>
        {users.map(user => (<h1>user.username</h1>))}
      </div>
    </div>
  )
};

export default FollowRecommendations;
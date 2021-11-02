import React, { useEffect } from 'react';

const FollowRecommendations = (props) => {


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
    .then(data => console.log(data));
  }, []);

  return(
    <div>
      <h1>Hello!</h1>
    </div>
  )
};

export default FollowRecommendations;
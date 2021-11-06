import React, { useEffect, useState } from 'react';
import RecommendedUser from './RecommendedUser'

const FollowRecommendations = (props) => {

  // Very W.I.P !!!!!!
  const [usersData, setUsersData] = useState([])
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
    .then(data => {setUsersData(data); console.log(data);});
  }, []);

  return(
    <div className="col-md-2 mt-2 mx-5">
      <div className="card" style={{width:250}}>
        <h3>Cool People:</h3>
        {usersData.map(data => <RecommendedUser key={data.user.id} user={data.user} image={data.image} />)}
      </div>
    </div>
  )
};

export default FollowRecommendations;
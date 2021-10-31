import React, { useState, useEffect } from 'react';
import UserProfileBox from './UserProfileBox';

const UserFollowers = (props) => {

    const [followers, setFollowers] = useState([]);
  
    useEffect(() => {
  
      const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      fetch('/api/user_followers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify({id: props.match.params.id})
      })
        .then(data => data.json())
        .then(data => setFollowers(data));
    }, [])
  
    return(
      <div className="row justify-content-center mx-0">
        {followers.map(data => <UserProfileBox data={data} key={data[0].id} />)}
      </div>
    )
}

export default UserFollowers;
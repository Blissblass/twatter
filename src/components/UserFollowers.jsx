import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import UserProfileBox from './UserProfileBox';

const UserFollowers = (props) => {

    const [followers, setFollowers] = useState([]);
  
    useEffect(() => {
  
      fetch('/api/user_followers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: props.match.params.id})
      })
        .then(data => data.json())
        .then(data => setFollowers(data));
    }, [props.match.params.id])
  
    return(
      <div className="row justify-content-center mx-0">
        {
          followers.length ? 
            followers.map(data => <UserProfileBox data={data} key={data[0].id} />)
          :
            <h1 className="text-center">User doesn't follow anyone :(</h1>  
        }
      </div>
    )
}

export default withRouter(UserFollowers);
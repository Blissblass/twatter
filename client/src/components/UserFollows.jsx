import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import UserProfileBox from './UserProfileBox';

const UserFollows = (props) => {

  const [follows, setFollows] = useState([]);

  useEffect(() => {

    fetch('/api/user_follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: props.match.params.id})
    })
      .then(data => data.json())
      .then(data => setFollows(data));
  }, [props.match.params.id])

  return(
    <div className="row justify-content-center mx-0">
      {
        follows.length ? 
          follows.map(data => <UserProfileBox data={data} key={data[0].id} />)
        :
          <h1 className="text-center">User has no following :(</h1>  
      }
    </div>
  )
};

export default withRouter(UserFollows);
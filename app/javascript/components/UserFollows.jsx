import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import UserProfileBox from './UserProfileBox';

const UserFollows = (props) => {

  const [follows, setFollows] = useState([]);

  useEffect(() => {

    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch('/api/user_follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify({id: props.match.params.id})
    })
      .then(data => data.json())
      .then(data => setFollows(data));
  }, [])

  return(
    <div className="row justify-content-center mx-0">
      {follows.map(data => <UserProfileBox data={data} key={data[0].id} />)}
    </div>
  )
};

export default withRouter(UserFollows);
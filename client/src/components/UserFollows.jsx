import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import UserProfileBox from './UserProfileBox';
import { Spinner } from 'react-bootstrap';

const UserFollows = (props) => {

  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('https://twatter-backend-api.herokuapp.com/api/user_follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: props.match.params.id})
    })
      .then(data => data.json())
      .then(data => {
        setFollows(data);
        setLoading(false);
      });
  }, [props.match.params.id])

  return(
    <div className="row justify-content-center mx-0">
      {
        loading ? 
          <Spinner animation="border" variant="primary" className="mx-auto mt-4" style={{width: 100, height: 100}} />
        :  
        follows.length ? 
          follows.map(data => <UserProfileBox data={data} key={data[0].id} />)
        :
          <h1 className="text-center">User has no following :(</h1>  
      }
    </div>
  )
};

export default withRouter(UserFollows);
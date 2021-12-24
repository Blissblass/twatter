import React, { useEffect, useState } from 'react';
import RecommendedUser from './RecommendedUser';
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";
import { Spinner } from 'react-bootstrap';

const FollowRecommendations = (props) => {
  const { currUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  useEffect(()=> {

    fetch('/api/follow_recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: currUser.id
      })
    })
    .then(data => data.json())
    .then(data => {
      setUsersData(data);
      setLoading(false);
    });
  }, [currUser.id]);

  return(
    <div className="col-md-2 mt-2 mx-5">
        <div className="card p-1 text-center" style={{width:250}}>
          <h3>Cool People</h3>

          {loading ? 
            <Spinner animation="border" variant="primary" className="mx-auto mt-2" style={{width: 50, height: 50}} />
          :
            usersData[0] ? 
              usersData.map(data => <RecommendedUser key={data.user.id} user={data.user} image={data.image} />) 
            :
              <h4>No recommendations available :/</h4>
          }

        </div>
    </div>
  )
};

export default FollowRecommendations;
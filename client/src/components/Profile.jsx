import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import { withRouter } from "react-router";
import ProfileInfo from './ProfileInfo';
import { Spinner } from "react-bootstrap";

const Profile = (props) => {
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  const [addData, setAddData] = useState({image: null, follows: null, followers: null});
  const [loading, setLoading] = useState(true);

  const userId = props.match.params.id;

  useEffect(() => {
    fetch(`/api/get_user_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId
      })
    })
    .then(data => data.json())
    .then(data => { 
      setProfUser(data.user);
      setProfPosts(data.twats);
      setAddData(data.additionalData);
      setLoading(false);
    });

  }, [userId]);

  return(
    loading ? 
      <div className="w-100 d-flex justify-content-center">
        <Spinner animation="border" variant="primary" className="mt-5" style={{width: 200, height: 200}} /> 
      </div>
    :
      <div className="row justify-content-center mx-0 mt-3">
        <ProfileInfo addData={addData} setAddData={setAddData} profUser={profUser} />
        
        <Feed posts={profPosts} />
      </div>
  )
};

export default withRouter(Profile);
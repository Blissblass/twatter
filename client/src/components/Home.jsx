import React, { useContext, useEffect, useState } from "react";
import TwatBox from './TwatBox';
import Feed from './Feed';
import FollowRecommendations from './FollowRecommendations';
import UserContext from "./Contexts/UserContext";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://twatter-backend-api.herokuapp.com/api/get_home_feed/${currUser.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [currUser.id])

  return(
    <div>
      <div className="row mt-10 mx-0" style={{height:300}}>
        <FollowRecommendations />
        <TwatBox setPosts={setPosts} />      
        <Feed posts={posts} setPosts={setPosts} loading={loading} />
      </div>
    </div>
    
  )
};

export default Home;
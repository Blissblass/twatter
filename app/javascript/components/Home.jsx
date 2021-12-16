import React, { useEffect, useState } from "react";
import TwatBox from './TwatBox';
import Feed from './Feed';
import FollowRecommendations from './FollowRecommendations';

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get_home_feed', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
      .then(data => {
        setPosts(data[0]);
        setLoading(false);
      });
  }, [])

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
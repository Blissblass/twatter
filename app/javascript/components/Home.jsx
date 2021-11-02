import React, { useEffect, useState } from "react";
import TwatBox from './TwatBox';
import Feed from './Feed';
import FollowRecommendations from './FollowRecommendations';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

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
      .then(data => setPosts(data[0]));
  }, [])

  return(
    <div>
      <div className="row justify-content-center mt-10 mx-0" style={{height:300}}>
        <TwatBox currUser={props.currUser} setPosts={setPosts} />
        <Feed posts={posts} currUser={props.currUser} setPosts={setPosts} />
        <FollowRecommendations currUser={props.currUser} />
      </div>
    </div>
    
  )
};

export default Home;
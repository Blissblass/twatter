import React, { useEffect, useState } from "react";
import TwatBox from './TwatBox';
import Feed from './Feed';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    fetch('/api/get_posts', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
      .then(data => setPosts(data));
  }, [])

  return(
    <div>
      <div className="row justify-content-center mt-2 mx-0" style={{height:300}}>
        <TwatBox currUser={props.currUser} setPosts={setPosts} />
        <Feed posts={posts} currUser={props.currUser} setPosts={setPosts} />
      </div>
    </div>
    
  )
};

export default Home;
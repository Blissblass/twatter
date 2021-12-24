import React from "react";
import Post from "./Post";
import { Spinner } from 'react-bootstrap';
import { useEffect } from "react";


const Feed = props => {

  const handleDelete = (postId) => {
    fetch(`/twats/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    props.setPosts(oldPosts => oldPosts.filter(post => post.id !== postId));
  };

  useEffect(() => {
    // Force re-render on props change (should automatically work this way but React is being stubborn so i had to come up with a solution)
  }, [props.loading]);


  return(
    <div className="row justify-content-center mx-0" >
       
        {
          props.loading ?
            <Spinner animation="border" variant="primary" className="mx-auto mt-4" style={{width: 100, height: 100}} />
          :
            props.posts ? 
            
            props.posts.map(post=> (
              <Post key={post.id} post={post} handleDelete={handleDelete} />
              )
            ) 
        
          : 
        
            <div className="card col-md-6 m-4 text-center"><h3 className="p-4">
              No posts available :/
              </h3>
            </div>
        }
    </div>
  )
};

export default Feed;
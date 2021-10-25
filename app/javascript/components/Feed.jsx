import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = props => {

  useEffect(() => {
    
  }, [props.posts]);
  

  const handleDelete = (postId) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch(`/twats/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      }
    });

    props.setPosts(oldPosts => oldPosts.filter(post => post.id != postId));
  };


  return(
    <div className="row justify-content-center mx-0" >
        {props.posts ? props.posts.map(post=> (
          <Post key={post.id} post={post} handleDelete={handleDelete} currUser={props.currUser}/>
          )
        ) : <div className="card col-md-6 m-4 text-center"><h3 className="p-4">No posts available :/</h3></div>}
    </div>
  )
};

export default Feed;
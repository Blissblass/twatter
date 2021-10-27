import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Post = (props) => {
  const [statDisplay, setDisplay] = useState(false);
  const [postLiked, setLiked] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [body, setBody] = useState(props.post.body);

  useEffect(() => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "id": props.post.id,
      "user_id": props.currUser.id
    }

    if(props.post && props.currUser) {
      fetch(`/api/twat_exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      })
      .then(data => data.json())
      .then(data => {
        if(data.length > 0) {
          setLikeData(data[0]);
          setLiked(true);
          return true;
        }
        setLikeData([{}])
        return false;
      });
    }
  }, [props.currUser.id]);
  

  const handleDisplay = () => {
    setDisplay(oldState => !oldState);
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleConfirm = (e) => {
    const newPost = props.post;
    newPost.body = body;

    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch(`/twats/${newPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(newPost)
    });
    
    setDisplay(oldDisplay => !oldDisplay);
  };

  const handleLike = (e) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "like": {
        "user_id": props.currUser.id,
        "twat_id": props.post.id
        } 
      };
      
    if(postLiked) {
      fetch(`/likes/${likeData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
      }).then(setLiked(false));
      console.log(likeData);
      console.log(`sending DELETE request to: /likes/${likeData.id}`);
    } else {
      fetch(`/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      }).then(setLiked(true));
    }
  }


  return(
    <div className="card col-md-6 m-4">
      <img src={props.post.image} className="w-25" />
      <h3><Link style={{textDecoration:"none"}} to={`/user/${props.post.user_id}`}>@{props.post.poster}</Link></h3>
      <h3 style={{display: !statDisplay ? "block" : "none"}}>{props.post.body}</h3>
      <textarea className="form-control" style={{display: statDisplay ? "block" : "none"}} value={body} onChange={handleChange}></textarea>
      
      <Button className="m-1" onClick={handleLike} style={{display: !statDisplay ? "block" : "none"}}>
        {postLiked ? "Remove Like" : "Like"}
      </Button>
      
      {
      props.currUser.id == props.post.user_id ? 
        <Button className="m-1" onClick={handleDisplay}>Edit</Button> 
        : 
        null
      }

      <Button className="m-1" onClick={handleConfirm} style={{display: statDisplay ? "block" : "none"}}>Confirm</Button>
      
      {
      props.currUser.id == props.post.user_id ? 
        <Button className="m-1" onClick={() => props.handleDelete(props.post.id)} 
                style={{display: !statDisplay ? "block" : "none"}}>Delete</Button> 
      : 
        null
      }
      
  </div>
  )
};

export default Post;
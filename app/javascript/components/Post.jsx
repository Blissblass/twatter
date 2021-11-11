import React, { useEffect, useState } from "react";
import PostButtons from './PostButtons';
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const Post = (props) => {

  const [statDisplay, setDisplay] = useState(false);
  const [body, setBody] = useState(props.post.body);
  const history = useHistory();
  
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

  const handleRedirect = () => {
    history.push(`/post/${props.post.id}`);
  };


  return(
    <div className="card col-md-6 m-4">
      <div style={{position: "relative"}} className="d-flex justify-content-between">
        <img style={{alignSelf: "end", borderRadius: 5}} src={props.post.image} className="w-25" />

        {props.post.media ?

          props.post.media_type == "video/mp4" ? 
          <div className="embed-responsive embed-responsive-4by3">
            <video style={{width: 400, borderRadius: 5, marginTop: 5}} controls={true} className="embed-responsive-item">
              <source src={props.post.media} type="video/mp4" />
            </video>
          </div>
          : 
            <img style={{width:350, borderRadius: 5}} src={props.post.media} /> 

        : 

          null
        } 
    </div>

      <h3><Link style={{textDecoration:"none"}} to={`/user/${props.post.user_id}`}>@{props.post.poster}</Link></h3>
      <h3 style={{display: !statDisplay ? "block" : "none", cursor:"pointer"}} onClick={handleRedirect}>{props.post.body}</h3>
      <textarea className="form-control" style={{display: statDisplay ? "block" : "none"}} value={body} onChange={handleChange}></textarea>
      
      <PostButtons post={props.post} currUser={props.currUser} />
      
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
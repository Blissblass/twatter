import React, { useState } from "react";
import PostButtons from './PostButtons';
import { Link, useHistory } from "react-router-dom";


const Post = (props) => {

  const [statDisplay, setDisplay] = useState(false);
  const [body, setBody] = useState(props.post.body);
  const history = useHistory();

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleRedirect = () => {
    history.push(`/post/${props.post.id}`);
  };


  return(
    <div className="card col-md-6 m-4">
      <div style={{position: "relative"}} className="d-flex justify-content-between">
        <img style={{alignSelf: "end", borderRadius: 5}} src={props.post.image} alt="Post user" className="w-25" />

        {props.post.media ?

          props.post.media_type === "video/mp4" ? 
          <div className="embed-responsive embed-responsive-4by3">
            <video style={{width: 400, borderRadius: 5, marginTop: 5}} controls={true} className="embed-responsive-item">
              <source src={props.post.media} type="video/mp4" />
            </video>
          </div>
          : 
            <img style={{width:350, borderRadius: 5}} src={props.post.media} alt="Post media" /> 

        : 

          null
        } 
    </div>

      <h3><Link style={{textDecoration:"none"}} to={`/user/${props.post.user_id}`}>@{props.post.poster}</Link></h3>
      <h3 style={{display: !statDisplay ? "block" : "none", cursor:"pointer"}} onClick={handleRedirect}>{props.post.body}</h3>
      <textarea className="form-control" style={{display: statDisplay ? "block" : "none"}} value={body} onChange={handleChange}></textarea>
      
      <PostButtons post={props.post} statDisplay={statDisplay} setDisplay={setDisplay} body={body} 
        handleDelete={props.handleDelete} />
      
  </div>
  )
};

export default Post;
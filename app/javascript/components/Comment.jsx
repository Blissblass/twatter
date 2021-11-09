import React from "react";
import { Link } from "react-router-dom";

const Comment = (props) => {


  return(
    <div className="row justify-content-center">
      <div className="card col-md-6 m-4 w-50">
        <img src={props.comment.image} className="w-25" />
        <h3><Link style={{textDecoration:"none"}} to={`/user/${props.comment.user_id}`}>@{props.comment.poster}</Link></h3>
        <h3 style={{cursor:"pointer"}}>{props.comment.body}</h3>
      </div>
    </div>
  )
};

export default Comment;
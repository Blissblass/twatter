import React from "react";
import Comment from './Comment';

const Comments = (props) => {

  return(
    <div>
      {props.comments.length !== 0 ? 
        props.comments.map(comment => <Comment key={comment.id} comment={comment} setComments={props.setComments} />) 
      : 
      <div className="row justify-content-center mx-0">
        <div className="card col-md-6  mt-3">
          <h3 className="p-5 text-center">No comments found!</h3>
        </div>
      </div>}
    </div>
  )
};

export default Comments;
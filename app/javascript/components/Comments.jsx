import React, { useEffect, useState } from "react";
import Comment from './Comment';

const Comments = (props) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/get_comments/${props.post_id}`)
      .then(data => data.json())
      .then(data => setComments(data))
  }, []);

  return(
    <div>
      {comments.length != 0 ? 
        comments.map(comment => <Comment key={comment.id} body={comment.body} />) 
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
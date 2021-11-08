import React, { useEffect, useState } from "react";

const Comments = (props) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/get_comments/${props.post_id}`)
      .then(data => data.json())
      .then(data => console.log(data))
  }, []);

  return(
    <div>
      {comments.map(comment => <Comment body={comment.body} />) }
    </div>
  )
};

export default Comments;
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UserContext from '../components/Contexts/UserContext';
import { useContext } from "react";

const CommentBox = (props) => {
  const { currUser } = useContext(UserContext);
  
  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data ={
      comment: {
        "user_id": currUser.id,
        "post_id": props.postId,
        "body": body
      }
    }

    fetch('/comments', {
      method: 'POST',        
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      .then(data => {props.setComments(oldComm => [data, ...oldComm])});
    setBody("");  
  };

  return(
    <div className="card col-md-6 mt-1">
      <h4 className="p-1">Logged in as {currUser.username}</h4>
      <form onSubmit={handleSubmit}>
        <textarea value={body} onChange={(e) => setBody(e.currentTarget.value) } className="form-control" style={{resize:"none"}} placeholder="Make a comment"></textarea>
        <p>{body.length}/250</p>
       <Button type="submit" disabled={body.length > 250 || body.length == 0} className="m-1">Make a comment!</Button>
      </form>
    </div>
  );
};

export default CommentBox;
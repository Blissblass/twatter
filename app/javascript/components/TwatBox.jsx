import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const TwatBox = props => {

  const [body, setBody] = useState("");

  useEffect(() => {

  }, [props.currUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBody("");
    const target = e.currentTarget[0];
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      twat: {
        body: target.value,
        user_id: props.currUser.id,
        poster: props.currUser.username
      }
    };
    fetch('/twats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(data)
    })
      .catch(err => console.log(err))
      .then(newData => props.setPosts(oldPosts => [data.twat, ...oldPosts]));

  };

  return(
    <div className="card col-md-6">
      <h3>Welcome, {props.currUser.username}</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={body} onChange={(e) => setBody(e.currentTarget.value) } className="form-control" style={{resize:"none"}} placeholder="Twat something on your mind..."></textarea>
        <p>{body.length}/250</p>
        <Button type="submit" disabled={body.length > 250 || body.length == 0}>Twat</Button>
      </form>
    </div>
  );
};

export default TwatBox;
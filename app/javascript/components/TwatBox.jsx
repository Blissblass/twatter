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
      } 
    };
    
    fetch('/twats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(data["twat"])
    })
      .catch(err => console.log(err))
      .then(data => data.json())
      .then(data => {
        data.poster = props.currUser.username;
        data.image = props.currUser.image
        props.setPosts(oldPosts => [data, ...oldPosts])
      })

      // props.setPosts(oldPosts => [data.twat, ...oldPosts])
  };

  return(
    <div className="card col-md-6 mx-0 mt-2">
      <h3>Welcome, {props.currUser.username}</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={body} onChange={(e) => setBody(e.currentTarget.value) } className="form-control" style={{resize:"none"}} placeholder="Twat something on your mind..."></textarea>
        <p>{body.length}/250</p>
        <Button type="submit" disabled={body.length > 250 || body.length == 0} className="m-1">Twat</Button>
      </form>
    </div>
  );
};

export default TwatBox;
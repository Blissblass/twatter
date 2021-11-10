import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const TwatBox = props => {

  const [body, setBody] = useState("");
  const [postMedia, setPostMedia] = useState();
  const [mediaURL, setMediaURL] = useState("");

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
      body: JSON.stringify(data)
    })
      .catch(err => console.log(err))
      .then(data => data.json())
      .then(data => {
        props.setPosts(oldPosts => [data, ...oldPosts])
      })
  };

  const handleMedia = (e) => {
    const media = e.currentTarget.files[0];
    const mediaURL = URL.createObjectURL(media);

    setPostMedia(media);
    setMediaURL(mediaURL);
    console.log(media);
    console.log(mediaURL);
  };

  return(
      <div className="card col-md-6 mt-2 mx-3">
        <h3>Welcome, {props.currUser.username}</h3>
        { mediaURL ? <img src={mediaURL} style={{width:250}} className="mb-2" alt="Optional media for twat."/> : null }
        <form onSubmit={handleSubmit}>
          <textarea value={body} onChange={(e) => setBody(e.currentTarget.value) } className="form-control" style={{resize:"none"}} placeholder="Twat something on your mind..."></textarea>
          <p>{body.length}/250</p>
          <div className="d-flex justify-content-between">
            <Button type="submit" disabled={body.length > 250 || body.length == 0} className="m-1">Twat</Button>
            <input type="file" className="form-control mb-1" style={{width:250}} onChange={handleMedia} />
          </div>
        </form>
      </div>
  );
};

export default TwatBox;
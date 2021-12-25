import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";

const TwatBox = props => {
  const { currUser } = useContext(UserContext);

  const [body, setBody] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const [mediaURL, setMediaURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const target = e.currentTarget[0];
    
    const formData = new FormData();
    formData.append("twat[body]", target.value);
    formData.append("twat[user_id]", currUser.id);
    if(postMedia) {
      formData.append("twat[media]", postMedia);
    }

    fetch('https://twatter-backend-api.herokuapp.com/twats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })
      .catch(err => console.log(err))
      .then(data => data.json())
      .then(data => {
        props.setPosts(oldPosts => [data, ...oldPosts]);
      })
    setBody("");  
    setMediaURL("");
  };

  const handleMedia = (e) => {
    const media = e.currentTarget.files[0];
    if(media) {
      const mediaURL = URL.createObjectURL(media);

      setPostMedia(media);
      setMediaURL(mediaURL);
    }
  };

  const handleMediaDelete = () => {
    setPostMedia(undefined);
    setMediaURL("");
  };

  return(
      <div className="card col-md-6 mt-2 mx-3">
        <h3>Welcome, {currUser.username}</h3>
        
        { mediaURL ?
          <div>
              <button type="button" className="btn-close m-2" style={{position:"relative", top:-97}} onClick={handleMediaDelete} />
              {postMedia.type === "video/mp4" ? 
                <div class="embed-responsive embed-responsive-4by3">
                  <video style={{width: 500, borderRadius: 5, marginTop: 0}} controls="true" class="embed-responsive-item">
                    <source src={mediaURL} type="video/mp4" />
                  </video>
                </div>
              : 
                <img src={mediaURL} style={{width:250, borderRadius:5}} className="mb-2" alt="Optional media for twat."/>
              }
              
          </div> 
        : 
          null 
        }

        <form onSubmit={handleSubmit}>
          
          <textarea value={body} onChange={(e) => setBody(e.currentTarget.value) } className="form-control" style={{resize:"none"}} placeholder="Twat something on your mind..."></textarea>
          <p>{body.length}/250</p>
          <div className="d-flex justify-content-between">
            <Button type="submit" disabled={body.length > 250 || body.length === 0} className="m-1">Twat</Button>
            <input type="file" className="form-control mb-1" style={{width:250}} onChange={handleMedia} />
          </div>
        </form>
      </div>
  );
};

export default TwatBox;
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PostPage = (props) => {

  const [twatData, setTwatData] = useState({});
  const [statDisplay, setDisplay] = useState(false);
  const [postLiked, setLiked] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [body, setBody] = useState(twatData.body);
  const history = useHistory();

  useEffect(() => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "id": twatData.id,
      "user_id": props.currUser.id
    }

    if(twatData.id && props.currUser) {
      fetch(`/api/twat_exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      })
      .then(data => data.json())
      .then(data => {
        if(data.length > 0) {
          setLikeData(data[0]);
          setLiked(true);
          return true;
        }
        setLikeData([{}])
        return false;
      });
    }
  }, [props.currUser.id, twatData.id]);

  useEffect(() => {
    fetch(`/api/get_twat/${props.match.params.id}`)
      .then(data => data.json())
      .then(data => setTwatData(data))
  }, []);
  

  const handleDisplay = () => {
    setDisplay(oldState => !oldState);
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleConfirm = (e) => {
    const newPost = twatData;
    newPost.body = body;

    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch(`/twats/${newPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(newPost)
    });
    
    setDisplay(oldDisplay => !oldDisplay);
  };

  const handleLike = (e) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    const data = {
      "like": {
        "user_id": props.currUser.id,
        "twat_id": twatData.id
        } 
      };
      
    if(postLiked) {
      fetch(`/likes/${likeData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
      }).then(setLiked(false));
    } else {
      fetch(`/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      }).then(setLiked(true));
    }
  }

  const handleRedirect = () => {
    history.push(`/post/${props.post.id}`);
  };

  return(
    <div className="row justify-content-center mx-0">
      <div className="card col-md-6 m-4">
        <img src={twatData.image} className="w-25" />
        <h3><Link style={{textDecoration:"none"}} to={`/user/${twatData.user_id}`}>@{twatData.poster}</Link></h3>
        <h3 style={{display: !statDisplay ? "block" : "none", cursor:"pointer"}} onClick={handleRedirect}>{twatData.body}</h3>
        <textarea className="form-control" style={{display: statDisplay ? "block" : "none"}} value={body} onChange={handleChange}></textarea>
        
        <Button className="m-1" onClick={handleLike} style={{display: !statDisplay ? "block" : "none"}}>
          {postLiked ? "Remove Like" : "Like"}
        </Button>
        
        {
        props.currUser.id == twatData.user_id ? 
          <Button className="m-1" onClick={handleDisplay}>Edit</Button> 
          : 
          null
        }

        <Button className="m-1" onClick={handleConfirm} style={{display: statDisplay ? "block" : "none"}}>Confirm</Button>
        
        {
        props.currUser.id == twatData.user_id ? 
          <Button className="m-1" onClick={() => props.handleDelete(twatData.id)} 
                  style={{display: !statDisplay ? "block" : "none"}}>Delete</Button> 
        : 
          null
        }
        
    </div>
  </div>
  )
};  

export default withRouter(PostPage);
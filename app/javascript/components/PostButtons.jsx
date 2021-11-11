import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const PostButtons = (props) => {

  const [postLiked, setLiked] = useState(false);
  const [likeData, setLikeData] = useState(null);

  useEffect(() => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "id": props.post.id,
      "user_id": props.currUser.id
    }

    if(props.post && props.currUser) {
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
  }, [props.currUser.id]);

  const handleLike = (e) => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      "like": {
        "user_id": props.currUser.id,
        "twat_id": props.post.id
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

  const handleConfirm = (e) => {
    const newPost = props.post;
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

  const handleDisplay = () => {
    setDisplay(oldState => !oldState);
  };

  return(
    <div style={{display:"flex", alignItems:"center"}}>

      {postLiked ? 
        <div style={{display:"flex", alignItems:"center"}}>
          <AiFillHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} /> 
          <h4>33</h4> 
        </div>
      : 
        <div>
          <AiOutlineHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} />
          <h5>33</h5> 
        </div>

      }
            
      {
      props.currUser.id == props.post.user_id ? 
        <ImPencil2 className="m-1" onClick={props.handleDisplay} />
      : 
        null
      }

      <Button className="m-1" onClick={handleConfirm} style={{display: props.statDisplay ? "block" : "none"}}>Confirm</Button>
      
      {
      props.currUser.id == props.post.user_id ? 
        <Button className="m-1" onClick={() => props.handleDelete(props.post.id)} 
                style={{display: !props.statDisplay ? "block" : "none"}}>Delete</Button> 
      : 
        null
      }
    </div>
  )
};

export default PostButtons;
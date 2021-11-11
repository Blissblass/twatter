import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";

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
    newPost.body = props.body;

    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch(`/twats/${newPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF
      },
      body: JSON.stringify(newPost)
    });
    
    props. setDisplay(oldDisplay => !oldDisplay);
  };

  const handleDisplay = () => {
    props.setDisplay(oldState => !oldState);
  };

  return(
    <div style={{display:"flex", alignItems:"center"}}>

      {postLiked ? 
        <div style={{display:"flex", alignItems:"center", marginRight: 27}}>
          <AiFillHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} /> 
          <h4>33</h4> 
        </div>
      : 
        <div style={{display:"flex", alignItems:"center", marginRight: 27}}>
          <AiOutlineHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} />
          <h4>33</h4> 
        </div>

      }

      <div style={{display:"flex", alignItems:"center", marginRight: 27}}>
        <IoChatbubbleOutline style={{cursor: "pointer", fontSize: 45}} />
        <h4>43</h4>
      </div>

            
      {
      props.currUser.id == props.post.user_id ? 
      <div style={{marginRight: 27}}>
        <ImPencil2 className="m-1" style={{cursor: "pointer", fontSize: 35}} onClick={handleDisplay} />
      </div>  
      : 
        null
      }


      <AiOutlineCheck className="m-1" onClick={handleConfirm} 
        style={{display: props.statDisplay ? "block" : "none", cursor: "pointer", fontSize: 50}} />
      
      {
      props.currUser.id == props.post.user_id ? 
        <FaRegTrashAlt className="m-1" onClick={() => props.handleDelete(props.post.id)} 
          style={{display: !props.statDisplay ? "block" : "none", cursor: "pointer", fontSize: 40}} /> 
      : 
        null
      }
    </div>
  )
};

export default PostButtons;
import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

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

  return(
    <div>
      {postLiked ? 
        <AiFillHeart style={{cursor: "pointer", fontSize: 150}} onClick={handleLike} /> 
      : 
        <AiOutlineHeart style={{cursor: "pointer"}} onClick={handleLike} />
      }
    </div>
  )
};

export default PostButtons;
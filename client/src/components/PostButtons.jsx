import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import UserContext from "./Contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

const PostButtons = (props) => {
  const { currUser } = useContext(UserContext);

  const [postLiked, setLiked] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0)

  useEffect(() => {
    const data = {
      "id": props.post.id,
      "user_id": currUser.id
    }

    if(props.post && currUser) {
      fetch(`https://twatter-backend-api.herokuapp.com/api/twat_exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(data => data.json())
      .then(data => {
        if(data.length > 0) {
          setLikeData(data[0]);
          setLiked(true);
          return;
        }
        setLikeData([{}])
      });

      fetch(`https://twatter-backend-api.herokuapp.com/api/twat_stats/${props.post.id}`)
        .then(data => data.json())
        .then(data => {
          setLikeCount(data.likes)
          setCommentsCount(data.comments);
        });
    }

    
  }, [currUser, currUser.id, props.post]);

  const handleLike = (e) => {
    const data = {
      "like": {
        "user_id": currUser.id,
        "twat_id": props.post.id
        } 
      };
      
    if(postLiked) {
      fetch(`https://twatter-backend-api.herokuapp.com/likes/${likeData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(data => {
        setLiked(false);
        setLikeCount(old => old -= 1);
      });
    } else {
      fetch(`https://twatter-backend-api.herokuapp.com/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(data => {
        setLiked(true);
        setLikeCount(old => old += 1);
      });
    }
  }

  const handleConfirm = (e) => {
    const newPost = props.post;
    newPost.body = props.body;

    fetch(`https://twatter-backend-api.herokuapp.com/twats/${newPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    });
    
    props.setDisplay(oldDisplay => !oldDisplay);
  };

  const handleDisplay = () => {
    props.setDisplay(oldState => !oldState);
  };

  return(
    <div style={{display:"flex", alignItems:"center"}}>

        <div style={{display:"flex", alignItems:"center", marginRight: 27}}>
          {postLiked ? 
          <AiFillHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} /> 
            :
          <AiOutlineHeart style={{cursor: "pointer", fontSize: 50}} onClick={handleLike} />
          } 
          <h4 className="mt-2">{likeCount}</h4> 
        </div>
   
        <Link to={`/post/${props.post.id}`} style={{ textDecoration: 'none', color:"#212529" }}>
          <div style={{display:"flex", alignItems:"center", marginRight: 27}}>
            <IoChatbubbleOutline style={{cursor: "pointer", fontSize: 45}} />
            <h4 className="mt-2">{commentsCount}</h4>
          </div>
        </Link>
     

            
      {
      currUser.id === props.post.user_id ? 
      <div style={{marginRight: 27}}>
        <ImPencil2 className="m-1" style={{cursor: "pointer", fontSize: 35}} onClick={handleDisplay} />
      </div>  
      : 
        null
      }


      <AiOutlineCheck className="m-1" onClick={handleConfirm} 
        style={{display: props.statDisplay ? "block" : "none", cursor: "pointer", fontSize: 50}} />
      
      {
      currUser.id === props.post.user_id ? 
        <FaRegTrashAlt className="m-1" onClick={() => props.handleDelete(props.post.id)} 
          style={{display: !props.statDisplay ? "block" : "none", cursor: "pointer", fontSize: 40}} /> 
      : 
        null
      }
    </div>
  )
};

export default PostButtons;